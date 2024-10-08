import { gql } from '@apollo/client';

export const QUERY_LAUNCH_PROFILE = gql`
  query LaunchProfile($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_year
      launch_success
      details
      links {
        flickr_images
      }
      launch_site {
        site_name
      }
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;
