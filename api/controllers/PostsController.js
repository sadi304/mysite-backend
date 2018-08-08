/**
 * PostsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    if (
      !_.has(req.body, "title") ||
      !_.has(req.body, "body") ||
      !_.has(req.body, "category")
    ) {
      return res.serverError("No field should be empty.");
    }
    var uploadPath = "../../assets/posts";
    return req
      .file("thumbnail")
      .upload({ dirname: uploadPath }, async function(err, uploadedFiles) {
        if (err) return res.serverError(err);
        let post;
        try {
          post = await Posts.create({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            thumbnail:
              uploadedFiles.length === 0
                ? ""
                : uploadedFiles[0].fd.split("/").reverse()[0]
          }).fetch();
          return res.json({ result: post });
        } catch (err) {
          return res.json({ error: err });
        }
      });
  }
};
