module.exports = <RequiredParams> {
  signUp: [
    'player_name',
    'email',
    'password',
    'secret_one',
    'secret_two'
  ],
  login: [
    'email',
    'password'
  ]
};

interface RequiredParams {
  signUp: Array<string>,
  login: Array<string>
};