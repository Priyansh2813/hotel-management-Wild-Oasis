import supabase, { supabaseUrl } from "./supabaseClient";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  console.log(id);
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return null;
}
export async function createCabin(cabin, id) {
  //https://tcedlsgyblezrccibpfr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //Creation of Cabin

  let query = supabase.from("cabins");

  //Creation of a cabin only when there is no id
  if (!id) {
    query = query.insert({ ...cabin, image: imagePath });
  }

  //edit the cabin if the ID is available

  if (id) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  //Upload only when cabin is created successfully

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  //delete the cabin if there was a strogae error while creating the bucket
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin image was not uploaded and cabin was not created");
  }

  return data;
}
