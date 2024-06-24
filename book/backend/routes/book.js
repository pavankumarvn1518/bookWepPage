const router = require("express").Router();
const User = require("../modeles/user");
const jwt = require("jsonwebtoken");
const Book = require("../modeles/book");
const { authenticateToken } = require("./userAuth");
const { json } = require("express");

//add book ---admin

router.post("/add-book", authenticateToken, async (req, res) => {
  try{
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
        return res
           .status(400)
           .json({ message:"you are not having access to perform admin work " });
    }
    const book = new Book({
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,

    });
    await book.save();
    res.status(200).json({message:"book added successfully"});

  } catch (error){
    res.status(500).json({ message: "Internal server error" });

  }
});
//update a book details
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
  const { bookid } = req.headers;
  await Book.findByIdAndUpdate(bookid, {
    url: req.body.url,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    desc: req.body.desc,
    language: req.body.language,
  });

  return res.status(200).json({
    message: "Book update successful",
  });
  } catch (error) {
      return res.status(500).json({ message: "Internal server error" });

  }
} );
//delete a book
router.delete("/delete-book", authenticateToken,async (req, res) => {
  try{
    const { bookid } =req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
      message:"Book Delete successfuly!",
    });

  }catch(error){
    return res.status(500).json({ message:"An error occured"});

  }

});
//get all books
router.get("/get-all-books",authenticateToken,  async(req,res) =>{
  try{
      const books = await Book.find().sort({ createAt: -1});
      return res.json({
        status: "Success",
        data: books,
      });
  }catch(error){
    console.log(error);
    return res.status(500).json({ message:"An error occured"});


  }
});

//get recently added books limit to 4 
router.get("/get-recent-books", async (req, res) => {
  try{
    const books = await Book.find().sort({ createAt: -1}).limit(4);
    return res.json({
      status: "success",
      data: books,
    });

  }catch(error){
    console.log(error);

    return res.status(500).json({ message:"An error occured"});

  }

});
//get book by id 
router.get("/get-book-by-id/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status:"Success",
      data: book,
    });
  }catch(error) {
    console.log(error);

    return res.status(500).json({ message:"An error occured"});


  }

});


 module.exports = router;





