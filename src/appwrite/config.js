import conf from "../config/config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite"


export class Service{
    client = new Client();
    database;
    storage;

    constructor() { 
        this.client
        .setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost({ title, category, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                  ID.unique(), {
                    title,
                    category,
                    content,
                    featuredImage,
                    status,
                    userId
                })
            
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{ title, category, content, featuredImage, status, userId }) {
        try {
            this.database.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug, {
                    title,
                    category,
                    content,
                    featuredImage,
                    status,
                    userId                
            })
            
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug)
             return true
        } catch (error) {
            throw error
            return false
        }
       
    }
    async getPost(slug) {
       
        try {
            return await this.database.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug)
        } catch (error) {
            
        }
        
    }
// 
    async getPosts(queries = Query.equal[("status", "active")]) {
        
        try {
            return await this.database.listDocuments(
            conf.appwriteDataBaseId,
            conf.appwriteCollectionId,
                queries,
            100
            )    
            
        } catch (error) {
            throw error
        }
    }

    //file upload service
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file)  
        } catch (error) {
            throw error;
            return false
        }
        
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
           
        } catch (error) {
            console.log(error);
        }
    }

    previewFile(fileId) {
        
        try {
           return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
        } catch (error) {
            
        }
    }
}

const service = new Service()
export default service