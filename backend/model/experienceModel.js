const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },  
  endDate:{
      type: Date,
  },
  tillNow:{
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },

});

export const Experience = mongoose.model("Experience", experienceSchema);

