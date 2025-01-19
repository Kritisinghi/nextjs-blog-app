'use client';
import { v4 } from "uuid";
import { createClerkSupabaseClient } from "../client";

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export async function uploadImage(file: File, token: string) {
  const fileName = v4();
  const fileExt = file.name.slice(file.name.lastIndexOf(".") + 1);
  const path = fileName + "." + fileExt;
  const { data, error } = await createClerkSupabaseClient(token).storage.from("BLOG").upload(path, file);
  return { fullPath: data?.fullPath, error };
} 