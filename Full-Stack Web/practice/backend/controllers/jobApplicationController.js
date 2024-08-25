const { Op } = require("sequelize");
const jobApplication = require("../models/jobApplication");
const User = require("../models/user");

exports.create = async (req, res) => {
    try {
        const { job_id, user_id, application_status } = req.body;

        if (!(job_id && user_id && application_status)) {
            console.log("All the details are not provided for creating a job application");
            return res.status(400).json({ message: "All the details are not provided for creating a job application" });
        }

        const userExist = await User.findOne({ where: { user_id } });
        if (!userExist) {
            return res.status(404).json({ message: "Provided user does not exist" });
        }

        // Check if the user is a job seeker
        if (userExist.user_type !== 'job_seeker') {
            return res.status(403).json({ message: "Only Job Seekers can apply for a job" });
        }

        //If Already requested
        const jobReq = await jobApplication.findOne({where : {job_id, user_id}});
        console.log("Jobreq : ",jobReq)
        if(jobReq)
        {
            console.log("Job already requested, cant request again")
            return res.status(206).send("Already Applied for the job");
        }

        const post = await jobApplication.create({ job_id, user_id, application_status });
        return res.status(201).json({ message: "Applied for the job!", post });

    } catch (err) {
        console.error("Error applying for a job:", err);
        return res.status(500).json({ message: "Error applying for the job", error: err.message });
    }
};

exports.view = async (req, res) => {
    try {
        const { user_id } = req.query;

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user_id)
        let jobApplications;
        if (user.user_type === "job_seeker") {
            console.log("getting from job seeker")
            jobApplications = await jobApplication.findAll({ where: { user_id } });
        } else if (user.user_type === "employer") {

            console.log("getting from employer")
            jobApplications = await jobApplication.findAll(); 
        } else { 
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (!jobApplications.length) {
            console.log("no job app : ", jobApplications)
            return res.status(404).json({ message: "No job applications found" });
        }

        return res.status(200).json(jobApplications);
    } catch (err) {
        console.error("Error fetching job applications:", err);
        return res.status(500).json({ message: "Error fetching job applications", error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Provide an ID" });
        }

        const post = await jobApplication.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "Job Application not found" });
        }

        await post.destroy();
        return res.status(200).json({ message: "Job Application deleted successfully" });
    } catch (err) {
        console.error("Error deleting Job Application:", err);
        return res.status(500).json({ message: "Error deleting Job Application", error: err.message });
    }
};
