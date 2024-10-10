import axios from "axios";
import { Config } from "../../Config";
import { handleApiError } from "../../APIs/ErrorHandler";
import axiosInstance from "../axiosInstance";

export const GetInspectionDeatilsByFilter = (data) => {
  const url = `get/AllInspectionDetails/ByFilter`;

  return new Promise((resolve, reject) => {
    axiosInstance.post(url, data)
      .then(response => {
        if (response?.data?.success) {
          resolve(response.data.data);
        } else {
          reject(new Error(response?.data?.error || 'Unknown error'));
        }
      })
      .catch(error => {
        const errorMessage = handleApiError(error);
      // alert(errorMessage); // Display error message in an alert
      reject(errorMessage);
      });
  });
};
export const GetInspectionAreas = (teamKey) => {
    const url = `get_inspection_area_details/${teamKey}`;
    return new Promise((resolve, reject) => {
      axiosInstance.get(url)
        .then(response => {
          if (response?.data?.success) {
            resolve(response.data.data);
          } else {
            reject(new Error(response?.data?.error || 'Failed to fetch inspection areas'));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
        // alert(errorMessage); // Display error message in an alert
        reject(errorMessage); // Reject with the error message for further handling if needed
     
        });
    });
  };

  export const UpdateInspectionItem = (data) => {
    const url = `getInspectionItem`;
  
    return new Promise((resolve, reject) => {
      axiosInstance.post(url, data)
        .then(response => {
          if (response?.data?.success) {
            resolve(response.data.data);
          } else {
            reject(new Error(response?.data?.error || 'Unknown error'));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
        // alert(errorMessage); // Display error message in an alert
        reject(errorMessage);
        });
    });
  };

  export const EditInspectionItem = (data) => {
    const url = `getItemCustomInspectionDetails`;
  
    return new Promise((resolve, reject) => {
      axiosInstance.post(url, data)
        .then(response => {
          if (response?.data?.success) {
            resolve(response.data.data);
          } else {
            reject(new Error(response?.data?.error || 'Unknown error'));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
        // alert(errorMessage); // Display error message in an alert
        reject(errorMessage);
        });
    });
  };

  export const InspectionAddItem = (data) => {
    const url = `add/Item`;
  
    return new Promise((resolve, reject) => {
      axiosInstance.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(new Error('Unexpected response status: ' + response.status));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
          // alert(errorMessage); // Display error message in an alert
          reject(errorMessage);
        });
    });
  };
  
  export const UpdateItemMapping = (data) => {
    const url = `updateInspectionItemMapping`;
  
    return new Promise((resolve, reject) => {
      axiosInstance.put(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            resolve(response.data);
          } else {
            reject(new Error('Unexpected response status: ' + response.status));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
          // alert(errorMessage); // Display error message in an alert
          reject(errorMessage);
        });
    });
  };


export const GetInspectioncabinateDetail = (data) => {
  const url = `cabinetStatus`;

  return new Promise((resolve, reject) => {
    axiosInstance.post(url, data)
      .then(response => {
        if (response?.data?.success) {
          resolve(response.data.data);
        } else {
          reject(new Error(response?.data?.error || 'Unknown error'));
        }
      })
      .catch(error => {
        const errorMessage = handleApiError(error);
      // alert(errorMessage); // Display error message in an alert
      reject(errorMessage);
      });
  });
};
export const GetInspectionItem = (data) => {
  const url = `inspectionarea`;

  return new Promise((resolve, reject) => {
    axiosInstance.delete(url, data)
      .then(response => {
        console.log(response,'dfdfddffd');
        if (response?.data?.success) {
          resolve(response.data);
        } else {
          reject(new Error(response?.data?.error || 'Unknown error'));
        }
      })
      .catch(error => {
        const errorMessage = handleApiError(error);
      // alert(errorMessage); // Display error message in an alert
      reject(errorMessage);
      });
  });
};
export const GetInspectionAreaDetail = (data) => {
  const url = `get_inspection_area`;

  return new Promise((resolve, reject) => {
    axiosInstance.post(url, data)
      .then(response => {
        if (response?.data?.success) {
          resolve(response.data.data);
        } else {
          reject(new Error(response?.data?.error || 'Unknown error'));
        }
      })
      .catch(error => {
        const errorMessage = handleApiError(error);
      // alert(errorMessage); // Display error message in an alert
      reject(errorMessage);
      });
  });
};
export const AddCustomArea = (data) => {
  const url = `inspection_details/CustomArea`;

  return new Promise((resolve, reject) => {
    axiosInstance.post(url, data)
      .then(response => {
        if (response?.data?.success) {
          resolve(response.data);
        } else {
          reject(new Error(response?.data?.error || 'Unknown error'));
        }
      })
      .catch(error => {
        const errorMessage = handleApiError(error);
      // alert(errorMessage); // Display error message in an alert
      reject(errorMessage);
      });
  });
};
