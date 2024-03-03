const userDataModel = require('../Model/UserData.model');

// to add data
const addUserData = async (req, res) => {
    try {
        const { userName, city, district, state, postalCode } = req.body;

        const addedUserData = await userDataModel.create({
            userName,
            city,
            district,
            state,
            postalCode
        })

        return res.status(201).json({
            success: true,
            message: "Data Added successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// to update data
const updateUserData = async (req, res) => {
    try {
        const { userName, city, district, state, postalCode } = req.body;
        const { id } = req.params;

        const updateData = await userDataModel.findByIdAndUpdate(id, {
            userName,
            city,
            district,
            state,
            postalCode
        }, { new: true });

        if (!updateData) {
            return res.status(404).json({
                success: false,
                message: 'Data Not Found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Data Updated Successfully',
            updateData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// to delete data
const deleteUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await userDataModel.findByIdAndDelete({ _id: id });

        if (!deletedData) {
            return res.status(404).json({
                success: false,
                message: 'Data Not Found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Data Deleted Successfully',
            deletedData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// to all data
const getAllUserData = async (req, res) => {
    try {
        const getAllData = await userDataModel.find();
        res.status(200).json({
            success: true,
            message: 'Found All Data',
            allData: getAllData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// to single data
const getSingleUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const singleUserData = await userDataModel.findById({ _id: id });

        if (!singleUserData) {
            return res.status(404).json({
                success: false,
                message: 'User Data Not Found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User Data Found',
            singleUserData
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = { addUserData, updateUserData, deleteUserData, getAllUserData, getSingleUserData }