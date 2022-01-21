// TODO: move to env file

// up2Tom api
export const token = 'Token 9307bfd5fa011428ff198bb37547f979';
export const up2Tom_url = (path) => `https://api.up2tom.com/v3/${path}/58d3bcf97c6b1644db73ad12`;

// mongoDB related api
export const mongoDB_url = `http://localhost:5001/record`;
export const mongoDB_url_query = (path) => `${mongoDB_url}/${path}`;

