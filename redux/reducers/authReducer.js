/* eslint-disable default-case */
let auth;
let referCode = "";
const ISSERVER = typeof window === "undefined";
if (!ISSERVER) {
  auth = localStorage.getItem("iid");
  referCode = localStorage.getItem("referCode");
}
let initialState = {
  auth: !!auth ? JSON.parse(auth) : {},
  isAuthenticated: !!auth,
  loading: false,
  userName: "",
  userMobile: "",
  errors: {},
  verifyLoading: false,
  isVerified: false,
  profileUpdateLoading: false,
  mobileAuth: [],
  otpLoading: false,
  sendOtp: "",
  resetPassword: "",
  redirectRegister: false,
  verifyOtp: "",
  verifyOtploading: false,
  forgetloading: false,
  otpVerifiedStatus: false,
  resendOtp: false,
  isProfileUpdated: false,
  isAccess: false,
  IsPassword: false,
  affiliate: !ISSERVER ? JSON.parse(auth)?.affiliate : {},
  refferalCode: !ISSERVER ? `IID${JSON.parse(auth)?.id}` : "",
  consultantReferCode: referCode ? JSON.parse(referCode || "") : "",
  refercodestatus: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_COUPON_CODE":
      localStorage.setItem(
        "coupon_code",
        action.payload ? JSON.stringify(action.payload) : ""
      );
      return { ...state };
    case "REGISTER":
      state = {
        ...state,
        loading: true,
        errors: {},
        userName: "",
        userMobile: "",
        verifyLoading: false,
        isVerified: false,
        redirectRegister: false,
      };
      break;
    case "REGISTER_FULFILLED":
      state = {
        ...state,
        auth: action.payload.user,
        isAuthenticated: true,
        loading: false,
        affiliate: action.payload?.affiliateShareUrl,
        refferalCode: `IID${action.payload?.user?.id}`,
      };
      localStorage.setItem(
        "iid",
        JSON.stringify({
          ...action.payload.user,
          affiliate: action.payload?.affiliateShareUrl,
        })
      );
      break;
    case "REGISTER_REJECTED":
      if (action.payload?.status === 422) {
        return {
          ...state,
          errors: action.payload.data.errors,
          loading: false,
        };
      } else {
        return {
          ...state,
          errors: action.payload?.data,
          loading: false,
        };
      }
    case "MOBILE_UPDATE":
      const { userMobile } = action;
      state = {
        ...state,
        userMobile,
      };
      break;
    case "LOGIN":
      state = {
        ...state,
        loading: true,
        errors: {},
      };
      break;
    case "LOGIN_FULFILLED":
      state = {
        ...state,
        auth: action.payload.user,
        isAuthenticated: true,
        loading: false,
        affiliate: action.payload?.affiliate,
        refferalCode: `IID${action.payload?.user?.id}`,
      };

      // Perform localStorage action
      localStorage.setItem(
        "iid",
        JSON.stringify({ ...state.auth, affiliate: action.payload?.affiliate })
      );

      break;

    case "LOGIN_REJECTED":
      if (action.payload.status === 422) {
        state = {
          ...state,
          errors: action.payload.data.errors,
          loading: false,
        };
      } else {
        state = {
          ...state,
          errors: action.payload.data,
          loading: false,
        };
      }
      break;
    case "MOBILE_LOGIN":
      state = {
        ...state,
        verifyLoading: true,
        errors: {},
        isVerified: false,
      };
      break;
    case "MOBILE_LOGIN_FULFILLED":
      const { name, redirectRegister } = action.payload;
      if (redirectRegister) {
        state = {
          ...state,
          verifyLoading: false,
          redirectRegister,
        };
      } else {
        state = {
          ...state,
          verifyLoading: false,
          userName: name,
          isVerified: true,
        };
      }
      break;
    case "MOBILE_LOGIN_REJECTED":
      if (action.payload.status === 422) {
        state = {
          ...state,
          errors: action.payload.data.errors,
          verifyLoading: false,
        };
      } else {
        state = {
          ...state,
          errors: action.payload.data,
          verifyLoading: false,
        };
      }
      break;
    case "SEND_OTP":
      state = {
        ...state,
        otpLoading: true,
        errors: {},
      };
      break;
    case "SEND_OTP_FULFILLED":
      state = {
        ...state,
        otpLoading: false,
      };
      break;
    case "SEND_OTP_REJECTED":
      state = {
        ...state,
        errors: action.payload,
        otpLoading: false,
      };
      break;

    case "RESET_REDIRECT_STATE":
      return { ...state, redirectRegister: action.payload };
    case "RESEND_OTP":
      state = {
        ...state,
        resendOtp: false,
        otpLoading: true,
        errors: {},
      };
      break;
    case "RESEND_OTP_FULFILLED":
      state = {
        ...state,
        resendOtp: true,
        otpLoading: false,
      };
      break;
    case "RESEND_OTP_REJECTED":
      state = {
        ...state,
        errors: action.payload.data,
        otpLoading: false,
      };
      break;
    case "VERIFY_OTP":
      state = {
        ...state,
        verifyOtploading: true,
        errors: {},
        otpVerifiedStatus: false,
      };
      break;
    case "VERIFY_OTP_FULFILLED":
      state = {
        ...state,
        verifyOtp: action.data,
        verifyOtploading: false,
        otpVerifiedStatus: true,
      };
      break;
    case "VERIFY_OTP_REJECTED":
      if (action.payload.status === 422) {
        state = {
          ...state,
          errors: action.payload.data.errors,
          verifyOtploading: false,
          otpVerifiedStatus: false,
        };
      } else {
        state = {
          ...state,
          errors: action.payload.data,
          verifyOtploading: false,
          otpVerifiedStatus: false,
        };
      }
      break;
    case "LOGOUT_FULFILLED":
      localStorage.removeItem("iid");
      localStorage.removeItem("affiliateCode");
      localStorage.removeItem("freeCoursesViewed");
      localStorage.removeItem("industrialSolutionViewed");
      localStorage.removeItem("isfeedbackavailability");
      window.location.reload(true);
      return {
        ...state,
        errors: {},
        isAuthenticated: false,
        auth: {},
        userName: "",
        userMobile: "",
        verifyLoading: false,
        isVerified: false,
        redirectRegister: false,
      };
    case "BACK_FULFILLED":
      state = {
        ...state,
        errors: {},
        auth: {},
        userName: "",
        userMobile: "",
        verifyLoading: false,
        isVerified: false,
        redirectRegister: false,
        otpVerifiedStatus: false,
      };
      break;
    case "FORGOT_PASSWORD":
      state = {
        ...state,
        forgetloading: true,
        errors: {},
      };
      break;

    case "SAVE_REFER_CODE":
      return { ...state, consultantReferCode: action.payload };
    case "FORGOT_PASSWORD_FULFILLED":
      state = {
        ...state,
        forgetloading: false,
        resetPassword: action.payload,
        IsPassword: true,
        auth: {},
        userName: "",
        userMobile: "",
        isVerified: false,
        otpVerifiedStatus: false,
      };
      break;

    case "RESET_FORGOT_FULLFLLED":
      state = { ...state, IsPassword: false };
      break;
    case "FORGOT_PASSWORD_REJECTED":
      if (action.payload.status === 422) {
        state = {
          ...state,
          errors: action.payload.data.errors,
          forgetloading: false,
        };
      } else {
        state = {
          ...state,
          errors: action.payload.data,
          forgetloading: false,
        };
      }
      break;

    case "TOKEN_FULFILLED":
      if (!action.payload) {
        state = {
          ...state,
          errors: {},
          isAuthenticated: false,
          auth: {},
        };
        localStorage.removeItem("iid");
        localStorage.removeItem("freeCoursesViewed");
        localStorage.removeItem("industrialSolutionViewed");
      }
      break;
    case "TOKEN_REJECTED":
      state = {
        ...state,
        errors: {},
        isAuthenticated: false,
        auth: {},
      };
      localStorage.removeItem("iid");
      localStorage.removeItem("freeCoursesViewed");
      localStorage.removeItem("industrialSolutionViewed");
      break;
    case "LOGINMODEL":
      state = {
        ...state,
        loading: true,
        errors: {},
      };
      break;
    case "WORKSHOPLOGIN_FULFILLED":
      state = {
        ...state,
        auth: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };

      // Perform localStorage action
      localStorage.setItem("iid", JSON.stringify(state.auth));

      break;

    case "WORKSHOPLOGIN_REJECTED":
      if (action.payload.status === 422) {
        state = {
          ...state,
          errors: action.payload.data.errors,
          loading: false,
        };
      } else {
        state = {
          ...state,
          errors: action.payload.data,
          loading: false,
        };
      }
      break;

    case "@PROFILE_UPDATE":
      state = {
        ...state,
        profileUpdateLoading: true,
        isProfileUpdated: false,
      };
      break;
    case "@PROFILE_UPDATE_FULFILLED":
      state = {
        ...state,
        profileUpdateLoading: false,
        auth: {
          ...state.auth,
          name: action.payload.name,
          email: action.payload.email,
          mobile: action.payload.mobile,
          user_pic: action.payload.user_pic,
          document_name: action.payload.document_name,
          document_pic: action.payload.document,
          aadharcard: action.payload.aadharcard,
          pancard: action.payload.pancard,
          rentaggrement: action.payload.rentaggrement,
          electricitybill: action.payload.electricitybill,
          propertydeed: action.payload.propertydeed,
          details: action.payload.details,
        },
        isProfileUpdated: true,
      };
      localStorage.setItem("iid", JSON.stringify(state.auth));
      break;
    case "@PROFILE_UPDATE_REJECTED":
      state = {
        ...state,
        profileUpdateLoading: false,
        errors: action.payload.data,
      };
      break;
    case "@RESET_PROFILE_UPDATE":
      state = {
        ...state,
        isProfileUpdated: false,
      };
      break;

    // case "@ACCESS":
    //   state = {
    //     ...state,
    //     isAccess: false,
    //   };
    //   break;
    // case "@ACCESS_FULFILLED":
    //   state = {
    //     ...state,
    //     isAccess: action.payload.access,
    //   };
    //   break;
    // case "ACCESS_REJECTED":
    //   state = {
    //     ...state,
    //     isAccess: false,
    //   };
    //   break;

    case "@WORKSHOPLOGIN":
      state = {
        ...state,
        loading: true,
        errors: {},
      };
      break;
    case "@WORKSHOPLOGIN_FULFILLED":
      state = {
        ...state,
        auth: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
      localStorage.setItem("iid-auth", JSON.stringify(state.auth));
      break;

    case "@WORKSHOPLOGIN_REJECTED":
      if (action.payload.status === 422) {
        state = {
          ...state,
          errors: action.payload.data.errors,
          loading: false,
        };
      } else {
        state = {
          ...state,
          errors: action.payload.data,
          loading: false,
        };
      }

    case "REFER_CODE":
      state = {
        ...state,
        isAccess: false,
      };
      break;
    case "REFER_CODE_FULFILLED":
      state = {
        ...state,
        refercodestatus: action.payload.affiliateShareUrl,
      };
      break;
    case "REFER_CODE_REJECTED":
      state = {
        ...state,
        isAccess: false,
      };
      break;
  }
  return state;
};

export default authReducer;
