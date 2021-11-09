/**
 * Makes a POST request to api with given endpoint and data
 * @param {string} endpoint - eg. "triage" or "diagnosis"
 * @param {number} age - Age of user
 * @param {string} sex - Value of user's gender
 * @param {evidence} evidence - gathered evidences.
 */
const api = async (endpoint, age, sex, evidence) => {
  return fetch(`https://api.infermedica.com/v3/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "App-Id": import.meta.env.VITE_APP_ID,
      "App-Key": import.meta.env.VITE_APP_KEY,
    },
    body: JSON.stringify({
      age: {
        value: age,
      },
      sex: sex,
      evidence: evidence,
    }),
  });
};

export default api;
