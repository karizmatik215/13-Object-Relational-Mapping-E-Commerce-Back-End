const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'Mo tag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData[0]) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
