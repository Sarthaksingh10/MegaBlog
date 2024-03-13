
import config from "../config/config";
import {Client,Databases,Storage,Query,ID} from 'appwrite'

export class ConfigureService{
    Client = new Client(); 
    databases;
    storage;

    constructor() {
        this.Client
      .setEndpoint(config.AppwriteUrl)
      .setProject(config.AppwriteProjectId);

      this.databases=new Databases(this.Client)
      this.storage=new Storage(this.Client)
    }

    async CreatePost(title,slug,content,featuredImage,status,userId){
    try {
        return await this.databases.createDocument(
            config.AppwriteDatabaseId,
            config.AppwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                content,
                status,
                userId,
            }
        )
    } catch (error) {
        console.log("CreatePost Error : " + error)
    }
    }
    async UpdatePost(slug,{title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(
            config.AppwriteDatabaseId,
            config.AppwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                content,
                status,
            }
        )
    } catch (error) {
        console.log("UpdatePost Error : " + error)
    }
    }
    async DeletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                slug
            )
            
        } 
        
        catch (error) {
            console.log("DeletePost Error : " + error)
        }
       
    }
    async Getpost(slug){
        try {
            return await this.databases.getDocument(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("GetPost Error: " + error);
           return false
        }
    }
    async GetPosts(queries=[Query.equal('status', "active")]){
        try {
            return await this.databases.listDocuments(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Error on getting posts : " + error)
            return false
        }
    }

    //Files Upload service

    async uploadfiles(file){
        try {
            await this.bucket.createFile(
            config.AppwriteBucketId,
            ID.unique(),
            file,
           )
           return true
        } catch (error) {
            console.log("Upload File Error : "+ error)
            return false
        }
    }
    async DeleteFiles(fileId){
        try {
             await this.bucket.deleteFile(
                config.AppwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Delete Files Error" + error)
            return false
        }
        
    }

   getFilePreview(fileId){
return this.bucket.getFilePreview(
    config.AppwriteBucketId,
    fileId
)
   }
   
}



const Service = new ConfigureService()


export default Service
