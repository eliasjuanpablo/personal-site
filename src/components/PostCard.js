import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "gatsby";

const PostCard = ({ title, description, publishedDate, slug }) => {
  return (
    <Card>
      <Link to={slug}>
        <Header>
          <Title>{title}</Title>
          <PublishedDate>
            {new Date(publishedDate).toLocaleDateString()}
          </PublishedDate>
        </Header>

        <Description>{description}</Description>
      </Link>
    </Card>
  );
};

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.secondary};
  font-size: 1rem;
  padding: 1em;

  border-bottom: 4px solid darkgray;
  border-radius: 10px;

  & a {
    color: inherit;
  }
`;

const Header = styled.div`
  font-size: 1.5em;
  display: flex;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
`;

const Description = styled.div``;

const PublishedDate = styled.small`
  font-size: 0.5em;
  margin-left: auto;
  margin-top: 0;
`;

export default PostCard;
