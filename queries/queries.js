const queries = {
  getClientByEmail: {
    operationName: "getClients",
    query:
      "query getClients($input: ClientGetInput) {\n  getClients(input: $input) {\n    pagseguroId: safePayUserId\n    hashPsId: safePayUserIdObfuscated\n    customerId\n    fullName\n    name\n    tradeName\n    email\n    document\n    type\n    registrationDate\n    emailConfirmation\n    activationStatus\n    preRegOwner\n    registeredOnPlatform\n    registrationStatus: validationStatus\n    customerStatus\n    inscriptionStatus\n    establishmentStatus\n    portfolioResponsibleName\n    portfolioDescription\n    idPreRegistrationHash\n    idtPerson\n    __typename\n  }\n}\n",
  },
  getClientsByDocument: {
    operationName: "getClients",
    query:
      "query getClients($input: ClientGetInput) {\n  getClients(input: $input) {\n    pagseguroId: safePayUserId\n    hashPsId: safePayUserIdObfuscated\n    customerId\n    fullName\n    name\n    tradeName\n    email\n    document\n    type\n    registrationDate\n    emailConfirmation\n    activationStatus\n    preRegOwner\n    registeredOnPlatform\n    registrationStatus: validationStatus\n    customerStatus\n    inscriptionStatus\n    establishmentStatus\n    portfolioResponsibleName\n    portfolioDescription\n    idPreRegistrationHash\n    idtPerson\n    __typename\n  }\n}\n",
  },

  getCustomerById: {
    operationName: "getCustomerLegacy",
    query:
      "query getCustomerLegacy($input: CustomerLegacyGetInput) {\n  getCustomerLegacy(input: $input) {\n    customerId: codCustomer\n    safepayUserId\n    __typename\n  }\n}\n",
  },
  getCustomerDetails: {
    operationName: "getAboutCustomer",
    query:
      "query getAboutCustomer($id: ID!) {\n  customer(id: $id) {\n    id\n    document\n    email\n    personId\n    registrationDate\n    name\n    fullName\n    type\n    business {\n      urls {\n        label\n        url\n        __typename\n      }\n      __typename\n    }\n    phones {\n      number\n      type\n      areaCode\n      __typename\n    }\n    partners {\n      document\n      fullName\n      motherName\n      __typename\n    }\n    addresses {\n      label\n      street\n      number\n      district\n      city\n      state\n      postalCode\n      complement\n      __typename\n    }\n    merchantSummary {\n      mcc {\n        code\n        description\n        __typename\n      }\n      __typename\n    }\n    readerActivationCode\n    portfolioSummary {\n      id\n      responsible {\n        id\n        name\n        __typename\n      }\n      channel {\n        currentResponsibleName\n        responsibleName\n        originDescription\n        __typename\n      }\n      segment {\n        description\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
  },
  getPromotionList: {
    operationName: "getMobilePromotionList",
    query:
      "query getMobilePromotionList($hType: String, $hierarchyId: Int) {\n  getMobilePromotionList(hType: $hType, hierarchyId: $hierarchyId) {\n    id\n    name\n    active\n    code\n    __typename\n  }\n}\n",
  },
  getCustomerEmailsByDocument: {
    operationName: "getClients",
    query:
      "query getClients($input: ClientGetInput) {\n  getClients(input: $input) {\n    pagseguroId: safePayUserId\n    hashPsId: safePayUserIdObfuscated\n    customerId\n    fullName\n    name\n    tradeName\n    email\n    document\n    type\n    registrationDate\n    emailConfirmation\n    activationStatus\n    preRegOwner\n    registeredOnPlatform\n    registrationStatus: validationStatus\n    customerStatus\n    inscriptionStatus\n    establishmentStatus\n    portfolioResponsibleName\n    portfolioDescription\n    idPreRegistrationHash\n    idtPerson\n    __typename\n  }\n}\n",
  },

  getSeller: {
    operationName: "getSeller",
    query:
      "query getSeller($input: InputSeller!) {\n  getSeller(input: $input) {\n    birth_date\n    document\n    mother_name\n    name\n    __typename\n  }\n}\n",
  },
  getEnterprise: {
    operationName: "getEnterprise",
    query:
      "query getEnterprise($input: InputEnterprise!) {\n  getEnterprise(input: $input) {\n    cnpj\n    companyName\n    partners {\n      name\n      cpf\n      __typename\n    }\n    __typename\n  }\n}\n",
  },
  onboardingValidate: {
    operationName: "onboardingValidate",
    query:
      "query onboardingValidate($input: InputOnboardingValidate) {\n  onboardingValidate(input: $input) {\n    status\n    reason {\n      code\n      message\n      __typename\n    }\n    description\n    field\n    __typename\n  }\n}\n",
  },

  postRegistrationData: {
    operationName: "postRegistrationData",
    query:
      "mutation postRegistrationData($input: PostRegistrationDataInput) {\n  postRegistrationData(input: $input) {\n    ediActive\n    effectiveRegistration\n    idHash\n    messageEdi\n    psUserId\n    waitingForAnalysis\n    __typename\n  }\n}\n",
  },

  getSumaryConditions: {
    operationName: "getSummaryConditions",
    query:
      "query getSummaryConditions($promotionPsId: Int, $hType: String, $hierarchyId: Int) {\n  getSummaryConditions(\n    promotionPsId: $promotionPsId\n    hType: $hType\n    hierarchyId: $hierarchyId\n  ) {\n    revenue\n    device {\n      name\n      price\n      __typename\n    }\n    captureMethods {\n      name\n      paymentMethods {\n        name\n        description\n        constraints {\n          paymentProcessors {\n            name\n            __typename\n          }\n          taxes {\n            min\n            max\n            value\n            valueFormatted\n            __typename\n          }\n          escrow\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
  },

  authenticate: {
    operationName: "authenticate",
    query:
      "mutation authenticate($input: LoginInput) {\n  authenticate(input: $input) {\n    ...FieldsLoginResponse\n    __typename\n  }\n}\n\nfragment FieldsLoginResponse on LoginResponse {\n  user {\n    id\n    name\n    regional\n    login\n    creationDate\n    updateDate\n    administrationConfig {\n      role\n      group\n      position\n      __typename\n    }\n    permissions\n    tagAnalytics\n    autoWithdraw\n    codExternalId\n    hierarchyID\n    hierarchyType\n    __typename\n  }\n  accessToken {\n    ...FieldsToken\n    __typename\n  }\n  refreshToken {\n    ...FieldsToken\n    __typename\n  }\n  acceptUsePolicy\n  anotherAuthInvalidated\n  __typename\n}\n\nfragment FieldsToken on OAuthToken {\n  id\n  expiresIn\n  scope\n  type\n  __typename\n}\n",
  },
  associateMobiPromotion: {
    operationName: "associateMobiPromotion",
    query:
      "mutation associateMobiPromotion($input: AssociateMobiPromotionInput) {\n  associateMobiPromotion(input: $input) {\n    associated\n    customerId\n    email\n    message\n    promotion\n    promotionId\n    __typename\n  }\n}\n",
  },

  getUserActivationCode: {
    operationName: "getUserActivationCode",
    // variables: {
    //   input: { codCustomer: "CUSTOMER:004447C34B26487994B3BB4BCDBE3FA5" },
    // },
    query:
      "query getUserActivationCode($input: UserActivationCodeInput) {\n  getUserActivationCode(input: $input) {\n    customerId\n    readerActivationCode\n    __typename\n  }\n}\n",
  },
  userPromotion: {
    operationName: "userPromotion",
    // variables: { customerId: "CUSTOMER:004447C34B26487994B3BB4BCDBE3FA5" },
    query:
      "query userPromotion($customerId: ID!) {\n  customer(id: $customerId) {\n    portfolioSummary {\n      responsible {\n        id\n        __typename\n      }\n      __typename\n    }\n    promotion {\n      acceptanceDate\n      currentMobiPromotion\n      pendingMobiPromotion\n      pendingMobiPromotionExpirationDate\n      preSelectionStatus\n      __typename\n    }\n    __typename\n  }\n}\n",
  },
};

module.exports = queries;
