const { Op } = require("sequelize");
const jobPosting = require("../models/jobPosting");
const User = require("../models/user");

exports.create = async (req, res) => {
    try {
        const { employer_id, job_title, job_description, location, salary_range, job_type } = req.body;

        if (!(employer_id && job_title && job_description && location && salary_range && job_type)) {
            console.log("All the details are not provided for creating a job post");
            return res.status(400).json({ message: "All the details are not provided for creating a job post" });
        }

        const userExist = await User.findOne({ where: { user_id: employer_id } });
        if (!userExist) {
            return res.status(404).json({ message: "Provided user does not exist" });
        }

         // Check if the user is an employer
         if (userExist.user_type !== 'employer') {
            return res.status(403).json({ message: "Only employers can create job posts" });
        }

        const post = await jobPosting.create({ employer_id, job_title, job_description, location, salary_range, job_type });
        return res.status(201).json({ message: "Job Posted!", post });

    } catch (err) {
        console.error("Error creating a job posting:", err);
        return res.status(500).json({ message: "Error creating a job posting", error: err.message });
    }
};

exports.view = async (req, res) => {
    try {
        let jobPosts;
        //console.log("USER THROUGH REQ : ", req.user.dataValues)
        if (req.query.searchId) {
            const id = Number(req.query.searchId);
            jobPosts = await jobPosting.findAll({ where: { job_id: id } });
        } else if (req.query.search) {
            const name = req.query.search;
            jobPosts = await jobPosting.findAll({ where: { job_title: { [Op.like]: `%${name}%` } } });
        } else {
            jobPosts = await jobPosting.findAll();
        }

        return res.status(200).json(jobPosts);
    } catch (err) {
        console.error("Error fetching job postings:", err);
        return res.status(500).json({ message: "Error fetching job postings", error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Provide an ID" });
        }

        const post = await jobPosting.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "Job post not found" });
        }

        await post.destroy();
        return res.status(200).json({ message: "Job post deleted successfully" });
    } catch (err) {
        console.error("Error deleting job post:", err);
        return res.status(500).json({ message: "Error deleting job post", error: err.message });
    }
};
