const express = require("express");
const fs = require("fs");
const data = require("./MOCK_DATA.json");

const app = express();
const PORT = 3000;

//Middleware (Plugin)
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${data.map((user) => `<li>${user.first_name}</li>`).join("<br>")}
    </ul>
    `;
  res.send(html);
});

//REST API points
app.get("/api/users", (req, res) => {
  return res.json(data);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = data.find((u) => u.id === id);

    return res.json(user);
  })

  .patch((req, res) => {
    //To Edit a user
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = data.findIndex((user) => user.id === id);
   
    if (userIndex !== -1) {
      // Update the user with the new data
      const updatedUser = {...data[userIndex], ...body   }
      data[userIndex] = updatedUser;
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(data, null, 4), (err, result) => {
        if(err)
            return result.status(500).json({status:"Error", message : result.message})
        return res.json({status : "edit Successful", user : updatedUser})
      })
    } else {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

  })

  .delete((req, res) => {
    //TO Create a USer
    const id = Number(req.params.id);
    const userIndex = data.findIndex((user) => user.id === id);
   
    if (userIndex !== -1) {
      // Update the user with the new data
      const deletedUSer = data.splice(userIndex, 1);
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(data, null, 4), (err, result) => {
        if(err)
            return result.status(500).json({status:"Error", message : result.message})
        return res.json({status : "Deleted USer", user : deletedUSer})
      })
    } else {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }
  });

app.post("/api/users", (req, res) => {
  //TO Create a USer
  const body = req.body;
  data.push({ ...body, id: data.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, result) => {
    return res.json({ status: "success", id: data.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
