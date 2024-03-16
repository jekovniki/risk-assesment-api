import { firestore } from "firebase-admin";

class ObjectDocumentModel<T extends { id: string }> {
    private readonly collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
    private readonly defaultProps: Partial<T>;

    constructor(collectionName: string, defaultProps: Partial<T> = {}) {
        this.collection = firestore().collection(collectionName);
        this.defaultProps = defaultProps;
    }

    public async create(data: T): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
        const documentRef = await this.collection.add({
            ...this.defaultProps,
            ...data
        });

        return documentRef;
    }

    public async find(field: keyof T, value: any): Promise<T[]> {
        const querySnapshot = await this.collection.where(field as string, '==', value).get();
        const documents: T[] = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() } as T);
        });
  
        return documents;
      }

    public async findOne(field: keyof T, value: any): Promise<T | null> {
        const querySnapshot = await this.collection.where(field as string, '==', value).limit(1).get();
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          return { id: doc.id, ...doc.data() } as T;
        }
        return null;
      }

    public async findById(id: string): Promise<T | null> {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() } as T;
        }
        return null;
    }

    public async updateOne(id: string, data: Partial<T>): Promise<void> {
        const docRef = this.collection.doc(id);
        await docRef.update(data);
    }

    public async findWithCustomQuery(query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>): Promise<T[]> {
      const querySnapshot = await query.get();
      const documents: T[] = [];
      querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() } as T);
      });
      return documents;
  }
}

export default ObjectDocumentModel;