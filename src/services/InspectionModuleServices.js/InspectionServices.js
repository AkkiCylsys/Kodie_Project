import axios from "axios";
import { Config } from "../../Config";
import { handleApiError } from "../../APIs/ErrorHandler";

export const GetInspectionDeatilsByFilter = (data) => {
  const url = `${Config.BASE_URL}get/AllInspectionDetails/ByFilter`;

  return new Promise((resolve, reject) => {
    axios.post(url, data)
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
    const url = `${Config.BASE_URL}get_inspection_area_details/${teamKey}`;
    return new Promise((resolve, reject) => {
      axios.get(url)
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
    const url = `${Config.BASE_URL}getInspectionItem`;
  
    return new Promise((resolve, reject) => {
      axios.post(url, data)
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
    const url = `${Config.BASE_URL}getItemCustomInspectionDetails`;
  
    return new Promise((resolve, reject) => {
      axios.post(url, data)
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
    const url = `${Config.BASE_URL}add/Item`;
  
    return new Promise((resolve, reject) => {
      axios.post(url, data, {
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
    const url = `${Config.BASE_URL}updateInspectionItemMapping`;
  
    return new Promise((resolve, reject) => {
      axios.put(url, data, {
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
  const url = `${Config.BASE_URL}cabinetStatus`;

  return new Promise((resolve, reject) => {
    axios.post(url, data)
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
export const GetInspectionAreaDetail = (data) => {
  const url = `${Config.BASE_URL}get_inspection_area`;

  return new Promise((resolve, reject) => {
    axios.post(url, data)
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
  const url = `${Config.BASE_URL}inspection_details/CustomArea`;

  return new Promise((resolve, reject) => {
    axios.post(url, data)
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
