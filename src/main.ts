import * as passport from "passport";
import { BearerStrategy } from "passport-azure-ad";
import * as restify from "restify";
import * as restifyPlugins from "restify-plugins";

const tenantName    = "velingeorgiev";
const clientID      =  "74f4223e-fb8a-499f-b851-2ae8c72553fa";

const credentials = {
  identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`, 
  clientID: clientID
};

const authenticatedUserTokens = [];

const authenticationStrategy = new BearerStrategy(credentials, (token: any, done: Function) => {
  
  console.log('authenticationStrategy');

  let currentUser;

  const userToken: any = authenticatedUserTokens.find((user: any): boolean => {
      currentUser = user;

      return user.sub === token.sub;
  });

  if(!userToken) {
      authenticatedUserTokens.push(token);
  }

  console.log(authenticatedUserTokens);
  
  return done(null, currentUser, token);
});

passport.use(authenticationStrategy);

const server = restify.createServer({ name: 'Azure Active Directroy with Node.js Demo' });
server.use(restifyPlugins.authorizationParser());
server.use(passport.initialize());
server.use(passport.session());

server.get('/', (_: any, res: any, next: any) => {

  res.json({ message: 'Hello from Node.js API!' });

  next();
});

server.get('/api/secured', passport.authenticate('oauth-bearer', { session: false }), (_: any, res: any, next: any): any => {

  console.log(res);
  res.json({ message: 'Secure response from Node.js API endpoint' });

  return next();
});

server.listen(process.env.PORT || 3000);

console.log('Server running http://localhost:3000');

const stop = (): void => {
  server.close();
  console.log('Server closed');
}

export default server;
module.exports.stop = stop;
