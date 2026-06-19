import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Certificate title is required"],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, "Issuer is required"],
      trim: true,
    },
    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
    },
    certificateUrl: {
      type: String,
      required: [true, "Certificate credential URL or file link is required"],
    },
    thumbnail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", CertificateSchema);
export default Certificate;
