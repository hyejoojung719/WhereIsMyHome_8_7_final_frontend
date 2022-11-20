const ruleStore = {
  namespaced: true,
  state: () => ({
    //Rules
    emailRules: [(v) => !!v || "이메일을 입력하세요.", (v) => /.+@.+/.test(v) || "올바르지 않은 이메일입니다."],
    passwordRules: [
      (v) => !!v || "비밀번호를 입력하세요.",
      (v) => (v && v.length >= 8 && v.length <= 15) || "비밀번호는 8자 이상 15자 이하입니다.",
      (v) => /^[a-zA-Z0-9]*$/.test(v) || "비밀번호는 영문,숫자만 입력 가능합니다.",
    ],
    nameRules: [
      (v) => !!v || "이름를 입력하세요.",
      (v) => !(v && v.length >= 10) || "이름은 10자 이상 입력할 수 없습니다.",
      (v) => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || "이름에는 특수문자를 사용할 수 없습니다.",
    ],
    birthRules: [
      (v) => !!v || "생년월일을 입력하세요.",
      (v) =>
        /^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(v) ||
        "YYYY-MM-DD 형식으로 날짜를 기입해주세요.",
    ],
  }),
  getters: {},
  mutations: {},
  actions: {},
};

export default ruleStore;
