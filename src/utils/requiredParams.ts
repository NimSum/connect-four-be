module.exports = <RequiredParams> {
  signUp: [
    'player_name',
    'email',
    'password',
    'secret_one',
    'secret_two'
  ]
};

interface RequiredParams {
  signUp: Array<string>
};