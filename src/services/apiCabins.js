import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const isNewFile = newCabin?.image instanceof File;

  let imagePath = newCabin.image;

  if (isNewFile) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      "",
    );

    const { data: uploadData, error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error("Storage error:", storageError);
      throw new Error("Cabin image could not be uploaded. Please try again.");
    }

    console.log("Image uploaded successfully:", uploadData);

    const { data: publicUrlData } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(imageName);

    imagePath = publicUrlData.publicUrl;
  }

  const cabinData = { ...newCabin, image: imagePath };
  if (id) {
    cabinData.id = id;
  } else {
    delete cabinData.id;
  }

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([cabinData]);
  } else {
    query = query.update(cabinData).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(`Cabin could not be created: ${error.message}`);
  }

  console.log("Cabin created successfully:", data);
  return data;
}

export async function deleteCabin(id) {
  // Fetch the cabin to get the image path
  const { data: cabin, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Cabin not found");
  }

  // Delete from database
  const { error: deleteError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(deleteError);

    if (deleteError.code === "23503") {
      throw new Error(
        "Cannot delete this cabin because it has existing bookings. Please delete the bookings first.",
      );
    }

    throw new Error("Cabin could not be deleted");
  }

  // Delete the image from storage
  if (cabin?.image) {
    const imageName = cabin.image.split("/").pop();
    await supabase.storage.from("cabin-images").remove([imageName]);
  }

  return cabin;
}
