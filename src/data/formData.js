export default [
  {
    step: 1,
    title: "Personal Information",
    description: "Please fill out your personal information",
    fields: [
      {
        type: "textfield",
        label: "Name",
        placeholder: "Enter your name",
        required: true,
      },
      {
        type: "radio",
        label: "Gender",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ],
        required: true,
      },
    ],
  },
  {
    step: 2,
    title: "Additional Information",
    description: "Please provide additional details",
    fields: [
      {
        type: "textarea",
        label: "Description",
        placeholder: "Enter a description",
        required: false,
      },
      {
        type: "autocomplete",
        label: "Title",
        placeholder: "Enter a title",
        options: ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."],
        required: true,
      },
    ],
  },
];
