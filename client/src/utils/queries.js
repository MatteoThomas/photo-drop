import { gql } from '@apollo/client';

export const GET_ME  = gql`
    {
        me {
            _id
            username
            email
            photoCount
            savedPhotos {
                photoId
                authors
                title
                description
                image
                link
            }
        }
    }
`;