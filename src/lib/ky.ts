import ky from "ky";

const kyInstance = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
  hooks: {
    beforeRequest: [() => console.log("before 1")],
    afterResponse: [() => console.log("after 1")],
  },
});
export default kyInstance;
