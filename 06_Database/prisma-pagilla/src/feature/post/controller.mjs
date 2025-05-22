import { postCreateOne, postDeleteOne, postFindMany, postFindOne, postUpdateOne } from "./model.mjs";

export const getAll = async (req, res) => {
  try {
    const result = await postFindMany();
    if (!result) return res.status(404).json({ error: "Not Found " });
    return res.json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const getOne = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(404).json({ error: "Not Found" });

  try {
    const result = await postFindOne(id);
    return res.json({ data: result });
  } catch (e) {
    return res.json({ error: e.stack });
  }
};

export const createOne = async (req, res) => {
  const body = req.body
  if (!body) return res.status(400).json({ error: "Bad Request" });

  try {
    const result = await postCreateOne(body);
    return res.json({ data: result });
  } catch (e) {
    return res.json({ error: e.stack });
  }
}

export const updateOne = async (req, res) => {
  const body = req.body
  const id = req.params.id
  if (!body) return res.status(400).json({ error: "Bad Request" });

  try {
    const result = await postUpdateOne(Number(id), body);
    return res.json({ data: result });
  } catch (e) {
    return res.json({ error: e.stack });
  }
}


export const deleteOne = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(404).json({ error: "Not Found" });

  try {
    const result = await postDeleteOne(id);
    return res.json({ data: result });
  } catch (e) {
    return res.json({ error: e.stack });
  }
};

