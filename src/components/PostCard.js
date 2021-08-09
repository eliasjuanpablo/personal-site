import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PostCard = ({ title, description, publishedDate }) => {
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
        <PublishedDate>
          {new Date(publishedDate).toLocaleDateString()}
        </PublishedDate>
      </Header>

      <Description>{description}</Description>
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

  box-shadow: 1px 6px 6px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 1px 6px 6px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 6px 6px 0px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  font-size: 1.5em;
  display: flex;
`;

const Title = styled.div`
  font-weight: 600;
`;

const Description = styled.div``;

const PublishedDate = styled.small`
  font-size: 0.5em;
  margin-left: auto;
  margin-top: 0;
`;

export default PostCard;
