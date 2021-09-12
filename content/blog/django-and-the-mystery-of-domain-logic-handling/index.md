---
title: Django and the mystery of domain logic handling
picture: faisal-g0rtzc1ibtu-unsplash.jpg
credit: 'Photo by <a
  href="https://unsplash.com/@faisaldada?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Faisal</a>
  on <a
  href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>   '
date: 2021-09-09T14:29:13.638Z
description: Writing Django projects that resist time
---
> “The heart of software is its ability to solve domain-related problems for its user.”
> ― Eric Evans, Domain-Driven Design: Tackling Complexity in the Heart of Software

NOTE: this is not an in-depth [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) nor [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) post, but it's meant to borrow their core concepts and try to fit them into Django's world. Feel free to do your research.

## The prominent "Domain"

By definition, every application models some aspect of a problem (e.g. real life business processes) in a way that reflects how its moving parts interact between eachother. We call this "problem's universe" its **Domain**, and you can think about it as a **software representation of a business model**. This means that, as a software developer, the domain model is your bread-and-butter: **every line of code you write exists because of it.**

Sounds important, right? Well, it is, and **a lot has been written around it,** so in this post I'll try to fit the most significative concepts into Django's world, and cover certain caveats that you may encounter.

## Layering

First of all, having said how important the domain model is, it becomes clear that it should be **thoughtfully handled**, in a way that it becomes **clearly distinguishable** from all the paraphernalia that makes your code work.

The proper way to achieve this is **layering.**

Layering is everywhere in our industry (e.g. Operating Systems, Networks, Security). It provides a way to **decouple responsibilities by isolating concerns**, so that they only **expose some sort of signature** that allows interaction **without leaking subjacent implementations**.

Well, your business domain is no different. That's why the concept of a **domain layer** exists: the project's core should be **completely independent from the underlying infrastructure** that powers it (i.e. web framework, persistence technology, cloud provider).

## Django's way

> When deciding where to put a piece of code, we like to follow the “*Fat Models*, Helper Modules, thin Views, *Stupid Templates*” approach ― Daniel Roy Greenfeld & Audrey Roy Greenfeld, Two Scoops Of Django

Incidentally, Django has its own opinions around separations of concerns. It uses an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)-ish high level idea but also allows you to put logic in several places, so I'll try to list some *do's and don'ts* that I've found useful for the projects I've worked on.

## Where NOT to put domain logic

Let's start by listing where you shouldn't put your application's core.

### **Templates**

These are meant to provide a **user-facing visual representation of your app**. In a typical off-the-shelf scenario, you'll be using server side rendered HTML files, but you could easily have **several *clients*** (as in devices, not people) that would need to consume the same data (e.g. if you decouple your frontend and use django as a [RESTful API](https://www.django-rest-framework.org/), you could have a mobile app + a web page that consume the same endpoints). This makes it obvious **NOT to put important decision-making capabilities** in here, as it would imply **replicating this logic on every client**. Luckily, **Django's template language is constrained** in a way that it doesn't allow you to get too creative (e.g. you can't perform queries inside of them).

Always try to keep your templates as stupid as possible.

### **Forms**

If you've done any simple CRUD page in Django, there's a huge chance you've used its built-in forms. They allow you to **validate incoming data in a declarative way** and **render an HTML form** with simple template interpolations. You may have noticed that they are **tightly coupled to templates** (i.e. you wouldn't use them in any other context), so what's been explained above also applies in here. You don't want to put complex decision making directly in your form classes, as **they may not be used as a data entrypoint in other scenarios**, which would force you to replicate that logic elsewhere. However, you can still use them as pass-throughs and leverage your models' logic (e.g. using `ModelForm`).

I'll discuss models' domain logic handling below, but for the sake of forms, try not to make them excessively complex.

### **Views**

In my opinion, the most controversial part of Django. First of all, from a [naming perspective](https://docs.djangoproject.com/en/3.2/faq/general/#django-appears-to-be-a-mvc-framework-but-you-call-the-controller-the-view-and-the-view-the-template-how-come-you-don-t-use-the-standard-names), and then from mysterious parts of the official docs, such as this quote:

> Where does the “controller” fit in, then? In Django’s case, it’s probably the framework itself: the machinery that sends a request to the appropriate view, according to the Django URL configuration. ― Django FAQs

If you ask me, *controllers* handle the incoming request and determines what should be done. Which is basically what *views* do, so I find this theoretical differentiation to be unnecesarily confusing. 

This means that **putting domain logic inside views will have the same "entrypoint-coupled" problem** that was described earlier: what if you need the same logic somewhere else (e.g. another view)? Well, that's why you should move your domain layer as far away from your entrypoints as possible.

**You should keep your views *thin***.

You may also have seen some code examples in Django's documentation like this one:

```python
class SomeView(ListView):
    def get_queryset(self, *args, **kwargs):
        return SomeModel.objects.filter(some__crazy__lookup=42)
```

and even though this could be enough for small sized projects, this is not the best of ideas.

For example, imagine you are developing an e-commerce platform and you want to list every product that's considered to be interesting for the user that's visiting the landing page. For your particular business, an "important product" would be found by **filtering by some specific criteria** (hypothetically using any kind of historical data). Now, let's say you go ahead and override the `get_queryset` method of that URL's view and put all the fancy filtering in there.

That works, right? But what if two weeks later you want to add periodic tasks that send emails to your users with interesting offers that could grab their attention?. In this scenario, you would have to **replicate the same filtering,** as the concept of an "important product" exists across different use cases. If you rewrite the same rules everywhere, you'll also have to maintain each one of them separately when requirements change over time.

How painful. It's clear at this point that **views are a really bad place for domain logic** to live.

### Serializers (Django Rest Framework)

Even though this isn't a DRF focused post, it's pretty interesting how they also became a tempting place to put domain logic in, so I didn't want to leave them out.

In a word, serializers are translators (a.k.a. Data Transfer Objects) that **convert JSON into Python and viceversa**. They are important when developing a RESTful API, as they format data in both directions and therefore allow end-to-end communication.

However, **serializer classes allow to override certain CRUD methods** (e.g. `create`, `update`, `save`) so you can add arbitrary logic there (which will only be executed after the incoming data has been properly validated, so it sounds great), but this is, again, a **really bad idea**. 

See this example from the DRF docs:

```python
class ContactForm(serializers.Serializer):
    email = serializers.EmailField()
    message = serializers.CharField()

    def save(self):
        email = self.validated_data['email']
        message = self.validated_data['message']
        send_email(from=email, message=message)
```

According to this example's description, `save` has been overriden here because it's more "meaningful" than `create` or `update`. I personally don't think that its subtle naming matters too much, and I'd never expect emails to be sent inside a payload validator. Serializers are meant to fit data into certain schemas for different entrypoints (e.g. you could reuse and compose them for different endpoints' expected payloads) but this doesn't mean you'll always execute the same logic for every scenario.

I hope that besides my opinion, you can see that it feels incorrect to put your domain logic in here.

## Where to put domain logic

Now that we've seen common caveats, let's see what may be better.

### Model methods

If you are familiar with OOP principles, you already know that classes provide a way to **encapsulate data along with the behavior that operates with it**. You would tipically design entities that represent aspects of "real life" and declare a public set of methods that allow other entities to interact with them without being aware of their private attributes.

Well, **models can easily work this way** effortlessly: after all, they are classes with data (i.e. their database fields as attributes) and behavior (the methods you can add to them). 

Also, you should note that **they have an intrinsic business meaning** (i.e. they have a role in the business domain), so they are naturally a good place to handle complex logic.

There are several ways to handle domain logic inside models. The simplest one involves **adding methods**.

Getting back to the hypothetical e-commerce platform, let's say this is its oversimplified data model:

```python
# ----- models.py -----

class Product(models.Model):
    category = models.CharField(max_length=10, choices=PRODUCT_CATEGORIES)


class User(models.Model):
    # fields not listed as they won't be used


class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
```

What if you want to get product suggestions when they visit a certain URL? Let's say that want to offer products that have the same category as those that have been purchased by the user within the last 7 days.

In order to keep our view unaware of the domain, you could do something like this:

```python
# ----- models.py -----

class Product(models.Model):
    category = models.CharField(max_length=10)

    # highlight-start
    @classmethod
    def get_suggested_for_user(cls, user):
        """Returns product suggestions based on recently purchased categories."""

        recently_purchased_categories = (
            Purchase
            .get_user_recent_purchases(user)
            .values_list('product__category')
            .distinct()
        )

        return cls.objects.filter(category__in=recently_purchased_categories)
    # highlight-end


class User(models.Model):
    pass


class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='purchases')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    # highlight-start
    @classmethod
    def get_user_recent_purchases(cls, user):
        """Returns a user's recent purchases."""

        from_date = datetime.today() - timedelta(days=7)
        return (
            cls.objects
            .filter(
                date__gte=from_date,
                user=user,
            )
        )
    # highlight-end


# ----- views.py -----

# Let's imagine this view is being pointed to from the /catalog url inside a urls.py file
class CatalogView(ListView):
    def get_queryset(self, *args, **kwargs):
        # Let's say you can get the current User from the request with a util function
        user = get_user(self.request)
# highlight-start
        # Delegates handling to the model, hence this view doesn't need to know what's the suggestions criteria.
        # If the filtering changes over time, this piece of code stays untouched.
        return Product.get_suggested_for_user(user)
# highlight-end
```

Some quick notes here:

* This allows you to reuse the product suggestions rules for other use cases.
* This implementation uses classmethods, just because it's meant to provide a way to query by certain criteria using the models' objects manager. You will end up adding instance methods for other purposes too.
* There's no correct answer around where to put behavior (that's basically a design decision you have to make). I'll cover an alternative approach that can prevent this later in this post. For now, this contrived example is meant to show how different entities can interact between eachother by using their methods.

### Model's custom manager

Django also provides its own way to handle domain logic, which involves **overriding the default** `objects` **manager**, or adding a new one. You can read more in the [docs](https://docs.djangoproject.com/en/3.2/topics/db/managers/).

This approach is not so different from the model methods described above. First, it changes the way these methods will be called (e.g. instead of `Product.get_suggested_for_user(user)` you may write something like `Product.objects.suggested_for_user(user)`).

Also, you can override the `get_queryset` method with common annotations or filtering so that you avoid repetition in certain scenarios.

We could rewrite our example using this approach:

```python
# ----- models.py -----

# highlight-start
class ProductManager(models.Manager):
    def suggested_for_user(self, user):
        """Returns product suggestions based on recently purchased categories."""

        recently_purchased_categories = (
            Purchase
            .objects
            .get_user_recent_purchases(user)
            .values_list('product__category')
            .distinct()
        )

        return self.filter(category__in=recently_purchased_categories)

# highlight-end

class Product(models.Model):
    category = models.CharField(max_length=10)

    # highlight-next-line
    objects = ProductManager()


class User(models.Model):
    pass


# highlight-start
class PurchaseManager(models.Manager):
    def get_user_recent_purchases(self, user):
        """Returns a user's recent purchases."""

        from_date = datetime.today() - timedelta(days=7)
        return (
            self
            .filter(
                date__gte=from_date,
                user=user,
            )
        )
# highlight-end


class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='purchases')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    # highlight-next-line
    objects = PurchaseManager()

# ----- views.py -----

# Let's imagine this view is being pointed to from the /catalog url inside a urls.py file
class CatalogView(ListView):
    def get_queryset(self, *args, **kwargs):
        # Let's say you can get the current User from the request with a util function
        user = get_user(self.request)
# highlight-next-line
        return Product.objects.suggested_for_user(user)
```

You can combine custom Querysets and Managers. I've avoided being too clever in here for simplicity sake, but you can find more examples [here](https://docs.djangoproject.com/en/3.2/topics/db/managers/#from-queryset).

### Domain Services & Selectors

> *NOTE: "Domain services" are a concept borrowed from [Eric Evans' DDD Book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215), although simplified for our purposes. Also, "selectors" work similarly to DDD's repositories, but its name has been taken from this [popular Django styleguide](https://github.com/HackSoftware/Django-Styleguide). I'm not interested in being dogmatic / theoretically accurate here, so I'll just cover their core concepts so you can benefit from them.*

So far we've seen how to use **fat models**, which in my opinion should be the **default approach** no matter the scale of your project. It requires almost the same effort when compared to putting everything in your views, and it can **save you a lot of refactoring headaches** down the road.

However, if your application grows significantly (or your domain is complex enough) you may find yourself **maintaining huge models** that do a lot of different things, or **having trouble deciding where to put new behavior** to avoid this in the first place.

In this scenario, **Services** and **Selectors** come in handy, as they do all the domain heavylifting themselves.

This allows you to **move the domain logic from your models to a more centralized approach, where a set of functions are responsible for orchestrating how entities behave**.

Our previous example could look like this:

```python
# ----- models.py -----

class Product(models.Model):
    category = models.CharField(max_length=10, choices=PRODUCT_CATEGORIES)


class User(models.Model):
    # ...


class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='purchases')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

# ----- selectors.py -----

# highlight-start
def get_user_recent_purchases(user):
      """Returns a user's recent purchases."""

    from_date = datetime.today() - timedelta(days=7)
    return (
        Purchase
        .objects
        .filter(
            date__gte=from_date,
            user=user,
        )
    )


def get_suggested_products_for_user(user):
    """Returns product suggestions based on recently purchased categories."""

    recently_purchased_categories = (
        get_user_recent_purchases(user)
        .values_list('product__category')
        .distinct()
    )

    return Product.objects.filter(category__in=recently_purchased_categories)
# highlight-end



# ----- views.py -----

# Let's imagine this view is being pointed to from the /catalog url inside a urls.py file
class CatalogView(ListView):
    def get_queryset(self, *args, **kwargs):
        # Let's say you can get the current User from the request with a util function
        user = get_user(self.request)
# highlight-next-line
        return get_suggested_products_for_user(user)
```

And you could also have a `services.py` file like this one:

```python
# ----- services.py -----
# This is merely demonstrative.

def purchase_product(product, user):
    # ... Validation based on business rules could happen here ...

    purchase = Purchase.objects.create(product=product, user=user)

    # It could also enqueue asynchronous tasks (which could also call other services)
    send_confirmation_email.delay(purchase)

# ...
```

Now, you may have noticed that this **defeats the purpose of basic OOP principles**. Your models become anemic (i.e. they are just *data bags* with no behavior attached to them), so this turns out to be this approach's biggest downside.

**The "services" concept is also deeper than what I've shown in this post**. The proper DDD way would involve **handling plain objects that are not aware of any infrastructure dependencies**. You can achieve this by increasing the amount of layers (i.e. you could work with plain Python classes that be translated into Django database models for persistence purposes). However, when I find myself trying to achieve this kind of book-ish approach in Django, I end up feeling that I'm derailing too much.

In my opinion, it's considerably better to be fairly idiomatic and follow your tools' philosophy.

### Conclusions

To be honest, **every approach has its pros and cons** (even if you put everything inside your views, you still have the advantage of simplicity!). I'd personally avoid trying to come up with the perfect cookiecutter where you fit all your projects in.

Also, most of these approaches aren't mutually exclusive, and the **amount of engineering fanciness should vary between different domains,** so keep it as simple as you can!

### TL;DR

Keep your business logic away from your application's entrypoints. This will increase reusability and allow you to control entities' interactions in a more isolated way. The amount of overengineering depends on your scale.