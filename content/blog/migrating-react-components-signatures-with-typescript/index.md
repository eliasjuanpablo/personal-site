---
title: Migrating bad React components with Typescript
picture: la-rel-easter-kucglbxjh_o-unsplash.jpg
credit: 'Photo by <a
  href="https://unsplash.com/@lastnameeaster?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">La-Rel
  Easter</a> on <a
  href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>   '
date: 2021-08-27T16:58:00.648Z
description: A powerful trick to fix unusable props by using type unions
---

## Reuse code, not pain

I don't think there's something as painful as _really_ _bad_ components. Ok, maybe there is, but you've probably felt far from great when using components that are **meant to be everywhere** (e.g. your company's "design system") and knowing they are **hacky** or **unflexible**. You are basically doomed to replicate client code that sucks.

This has recently happened to me while working for a product company. My teammates and I would import these cumbersome pieces of code that someone wrote years ago, pass mysterious props that noone knew why they were required, and beg the designers not to get too creative as **we couldn't change much** of what was available without **making breaking changes**.

At some point, you may be able to cope with it (or maybe your are not so picky / opinionated), but eventually you'll find that technical debt will bite you and, as time goes by, become harder to fix.

## Turning mystery into types

We were living in this world of "ok-we-will-fix-it-eventually", until a new engineer that was keen on Typescript joined the team.

To be honest, I've never felt the need of typing Javascript (I don't necessarily add TS to every project if I don't feel like it's worth it) but I was completely blown away when he showed us the advantages that it introduced to our situation.

I'll share the approach we took and how you could benefit from it.

### 1. Add Typescript

Luckily, we already had Typescript in our project (although we weren't using it everywhere, so our common components weren't typed anyway). This first step **might be a dealbreaker** for your team if for some reason you are not willing to add it. However, setting it up isn't a big deal and it can be adopted partially **along preexisting JS** (after all, TS is nothing more than a superset of the latter).

### 2. Identify existing signatures

Maybe you already have **PropTypes** for your components (they don't enforce much, but they help identifying what's going on right now). If not, you will have to spend some time **finding all occurrences** of a component so you don't overlook any uses cases.

### 3. Declare an interface

Create an **interface** that matches the existing props (you can name it "Legacy*Something*" if you'd like to make it clear for other developers that they're being deprecated).

```jsx
// Hypothetical component with bad props
function SomeComponent(props) {
  const { really, bad } = props;

  return (
    <div>
      I'm not the sharpest tool in the shed, and I use {really} {bad} props in
      here
    </div>
  );
}

SomeComponent.propTypes = {
  really: PropTypes.string.isRequired,
  bad: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired,
};
```

Becomes:

```tsx
interface ILegacySomeComponentProps {
  really: !string;
  bad: !string;
  signature: !string;
}

function SomeComponent(props: ILegacySomeComponentProps) {
  const { really, bad } = props;
  return (
    <div>
      I'm not the sharpest tool in the shed, and I use {really} {bad} props in
      here
    </div>
  );
}
```

_NOTE: You can use types instead. Just stick to some convention that everyone agrees with._

### 3. Come up with a better signature

This requires the biggest effort. Now that you are deprecating something bad, you should try to **come up with a new signature that resists time** and makes everyone happy in the long run.

There's no rule of thumb here, but you should have a better idea of how it should look after feeling the frustration coming from preexisting limitations.

You should also leave room for further improvement (i.e. don't try to come up with a perfect design for all future cases. Trust me: it can't be as bad as what you already have).

### 4. Create a new signature and branch behaviors

Typescript has this awesome feature called **control flow analysis**, which lets the compiler **narrow down types** based on type checks (i.e. it will infere a variable's type based on unreachable code).

If you combine this with **type unions** (which let you compose interfaces for the same parameter), you can branch completely different behaviors in a safe way.

You should go ahead and **create a new interface** for the improved signature you came up with, and cha**nge the component's signature to use a type union** that handles both prop types.

In order to achieve this, you have to create a helper function that will **determine if the passed props are legacy**. This is done by the `isLegacy` function, and its implementation depends on your particular case (here we just checked if the `bad` hypothetical prop is present or not).

You can read more on this (and many other great TS features) [here](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

```tsx
interface ILegacySomeComponentProps {
  really: !string;
  bad: !string;
  signature: !string;
}

// These will be the props that everyone should use from now on.
// Note how this can be completely different from the legacy one.
interface ISomeComponentProps {
  better: !function;
  signature: !string;
}

type Props = ILegacySomeComponentProps | IConfirmationProps;

function isLegacy(props: Props): props is ILegacySomeComponentProps {
  return (props as ILegacySomeComponentProps).bad !== undefined;
}

function SomeComponent(props: Props) {
  if (isLegacy(props)) {
    return (
      <div>
        I'm not the sharpest tool in the shed, and I use {really} {bad} props in
        here
      </div>
    );
  }

  return (
    <div>
      Here goes the fancy new behavior! I can use {signature} here but not the
      old ones
    </div>
  );
}
```

### 5. Enjoy responsibly

Keep in mind that, even though you'll be able to clear your path towards better features, you'll still have to maintain the legacy implementation and **migrate everything** as early as possible. Technical debt gets harder to fix overtime, so it should be prioritized thoughtfully.

Also, there's nothing more pleasant than deleting deprecated code.

## TL;DR

**You will have to bite the bullet and rewrite bad code eventually**, but you can make sure it happens **smoothly over time** by using type checking tricks.
