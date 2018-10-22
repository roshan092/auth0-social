function (user, context, callback) {
  console.log('=============>Inside rule');
  var CLIENTS_ENABLED = ['WxF9QOfKcpaTEAx5oXkv4Y7MmvjugFx7'];
  // run only for the specified clients
  if (CLIENTS_ENABLED.indexOf(context.clientID) === -1) {
    return callback(null, user, context);
  }
  const {type} = context.request.query;
  console.log('=============>type', type);
  if (user.identities[0].isSocial) {
    console.log('=============>Inside social user loop');
    if (type === 'register') {
      console.log('=============>Inside link social');
      const {email, given, family, postcode} = context.request.query;
      var ManagementClient = require('auth0@2.6.0').ManagementClient;
      var management = new ManagementClient({
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1FRkNOalpHUlRJMFJqa3hOVGhETXpJM016VkZORUZCUmtVMVFVRXdOek5HT0RjME9VSkdNQSJ9.eyJpc3MiOiJodHRwczovL3NvdXphbG9ib3MuYXUuYXV0aDAuY29tLyIsInN1YiI6Im5rc2p1RzJlZktNNDIwOXdSYXdaWU5mS3ZTRElTRGFQQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3NvdXphbG9ib3MuYXUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1MzYzMjE1MDEsImV4cCI6MTUzNjMyNzUwMSwiYXpwIjoibmtzanVHMmVmS000MjA5d1Jhd1pZTmZLdlNESVNEYVAiLCJzY29wZSI6InJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.bcRZolGPBlWwjTHuiCdL_yfPQuXwL_SlrAcUCaSeeWgwfmO9Uex98HOhKz_IkzgFiz3SyfYJNtB8xIJlh_ci2vjffaNzu1HS1CpDF2X7NlSsmEvevWVEAO-YAGhU5voP8H03yV9gnLf_tHHCKczxDN_qG8_nLDZzqF1RTDdVKgFTqydFwQeXf0xJ0MgYC-DU04TYKBxCN2fMREBAYY4TyLTpLFhc_rJp_3wiwYvDCbNRXKQrGdMJLAqTCzX1Jts3h7WPyiN7qKy9Hx768aw0IhPuEyjIC7AqVTnng1NWscxAGx615cuCNd_QLXX3CaUsLErrs8K97_DQi2jD6yAvdQ',
        domain: 'souzalobos.au.auth0.com',
      });

      management.createUser({
        email,
        given_name: given,
        family_name: family,
        password: "P@ssw00rD123",
        connection: "Username-Password-Authentication",
        user_metadata: {
          first: given,
          last: family,
          postcode
        },
        email_verified: true,
        verify_email: false,
        app_metadata: {
          is_social: true
        }
      }, function (err, auth0User) {
        if (err) {
          throw err;
        }
        console.log('user----->', auth0User);
        management.linkUsers(auth0User.user_id, {
          user_id: user.user_id,
          provider: user.identities[0].connection
        }, function (err, finalUser) {
          if (err) {
            throw err;
          }
          context.primaryUser = auth0User.user_id;
          callback(null, user, context);
        });
      });
    } else if (type === 'linking') {
      console.log('=============>Inside social redirect');
      const {email, given_name, family_name} = user;
      context.redirect = {
        url: `http://localhost:8080/custom/signup?email=${email}&given=${given_name}&family=${family_name}`,
      };
      callback(null, user, context);
    } else {
      console.log('=============>Do stuff before you want to link social account');
      callback(null, user, context);
    }
  } else {
    console.log('=============>Calling callback without rule', user);
    callback(null, user, context);
  }
}
