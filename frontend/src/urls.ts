export const apiPrefix = process.env.REACT_APP_API_URL;
export const apiPrefixUserService = process.env.REACT_APP_API_URL_USER_SERVICE;
const urls = {
  users: {
    fetchProfilePicture: `${apiPrefix}/file`,
    fetchUserDetails: `${apiPrefix}/users`,
    updateUserDetails: `${apiPrefix}/users`,
    resetUserPassword: `${apiPrefixUserService}/users`,
    updateUserProfilePic: `${apiPrefix}/files`,
    editUserRole: `${apiPrefix}/users`,
    getUserInfo: `${apiPrefix}/users`,
  },
  employees: {
    registerUser: `${apiPrefix}/users`,
    registerCompanyEmployee: `${apiPrefix}/companyEmployees`,
    getCompanyEmployee: `${apiPrefix}/companies`,
  },
  registrationKeys: {
    userRegister: `${apiPrefix}/registrationKeys`,
    getCondoID: `${apiPrefix}/userCondos`,
  },
  requests: {
    submitRequest: `${apiPrefix}/requests`,
    getRequest: `${apiPrefix}/requests`,
    editRequest: `${apiPrefix}/requests`,
  },
  userCondos: {
    submitUserCondo: `${apiPrefix}/userCondos`,
    getCondoById: `${apiPrefix}/condoUnits`,
    getCondoFiles: `${apiPrefix}/files`,
  },
  properties: {
    getAllProperties: `${apiPrefix}/properties`,
    getProperty: `${apiPrefix}/properties`,
    deleteProperty: `${apiPrefix}/properties`,
    getCompanyProperties: `${apiPrefix}/companies`,
  },
  companies: {
    getCompany: `${apiPrefix}/companies`,
  },
  notifications: {
    getNotification: `${apiPrefix}/notifications`,
    deleteNotification: `${apiPrefix}/notifications`, //TODO
  },
  costs: {
    addCost: `${apiPrefix}/costs`,
    getCosts: `${apiPrefix}/costs`,
  },
  condos: {
    getAllCondos: `${apiPrefix}/condoUnits`,
  },
  commonFacility: {
    submitCommonFacility: `${apiPrefix}/commonFacilities`,
    commonFacilitiesByPropertyId: `${apiPrefix}/properties`,
  },
};

export default urls;
