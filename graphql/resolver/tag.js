const Tag = require("../../models/tag");

module.exports = {
  getAllTags: async () => {
    try {
      const tags = await Tag.find();

      return tags;
    } catch (err) {
      throw err;
    }
  },
  createTag: async (input, req) => {
    const newTagName = input.name.trim();
    try {
      const tagsList = await Tag.find();
        
      const filteredTagList = tagsList.filter(element => {
        return element.name === newTagName;
      });
     
      if (filteredTagList.length > 0) {
        throw new Error("Tag name is existing");
      }

      const newTag = new Tag({
        name: newTagName
      });

      const result = await newTag.save();
      return result;
    } catch (err) {
      throw err;
    }
  }
};
