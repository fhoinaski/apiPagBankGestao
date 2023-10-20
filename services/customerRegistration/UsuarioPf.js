const criarNovoEmailReducao = require("../emails/criarNovoEmail");
const queries = require("../../queries/queries");

class UsuarioPf {
  constructor(dadosPaylaod) {
    
    this.dadosPaylaod = dadosPaylaod;
    this.postRegistrationData = queries.postRegistrationData;
  }
 

  async criarNovoEmail() {
    try {
      const email = await criarNovoEmailReducao(this.dadosPaylaod.user.email);
      return email;
    } catch (error) {
      console.error(error);
      return this.dadosPaylaod.user.email; 
    }
  }

  async getPayload() {
    const email = await this.criarNovoEmail();

    const payload = {
      operationName: this.postRegistrationData.operationName,
      variables: {
        input: {
          user: {
            address: {
              address: this.dadosPaylaod.user.address.address,
              addressNumber: this.dadosPaylaod.user.address.addressNumber,
              city: this.dadosPaylaod.user.address.city,
              districtID: this.dadosPaylaod.user.address.districtID,
              districtName: this.dadosPaylaod.user.address.districtName,
              federationUnit: this.dadosPaylaod.user.address.federationUnit,
              postalAreaCode: this.dadosPaylaod.user.address.postalAreaCode,
              addressComplement: this.dadosPaylaod.user.address.addressComplement,
            },
            bank: {
              bankBranch: null,
            },
            business: {
              productMainCategoryId: this.dadosPaylaod.user.business.productMainCategoryId,
              mobiPromotionId: this.dadosPaylaod.user.business.mobiPromotionId,
              mobiPromotionName: this.dadosPaylaod.user.business.mobiPromotionName,
            },
            document: this.dadosPaylaod.user.document,
            email: email,
            // email: this.dadosPaylaod.user.email,
            edi: {
              reconciliator: {},
              van: {},
            },
            info: {
              autoDeclaredPPE: "false",
              birthDate: this.dadosPaylaod.user.info.birthDate,
              celAreaCode: this.dadosPaylaod.user.info.celAreaCode,
              celPhoneNumber: this.dadosPaylaod.user.info.celPhoneNumber,
              cnpj:"",
              companyName:"",
              cpf: this.dadosPaylaod.user.info.cpf,
              motherName: this.dadosPaylaod.user.info.motherName,
              monthlyRevenue: Number(this.dadosPaylaod.user.info.monthlyRevenue),
              name: this.dadosPaylaod.user.info.name,
              networkCompanyRole: "M",
              networkCompanyRoleDesc: "Matriz",
              netWorth: Number(this.dadosPaylaod.user.info.netWorth),
              phoneAreaCode: null,
              phoneNumber: null,
              trademark:"",
            },
            isHeadquarterDependent: false,
            mainEmail: true,
          },
          type: "pf",
        },
      },
      query:this.postRegistrationData.query,
    };
    return payload;
  }
}

module.exports = UsuarioPf;
