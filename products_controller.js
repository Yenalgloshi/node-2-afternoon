// module.exports will export an object with five methods. 
// All methods will capture req, res, and next.  
// This allows the methods access to dbInstance.
module.exports = {
    create: ( req, res, next ) => {
// dbInstance variable is for the database instance off of req.app.
        const dbInstance = req.app.get('db');
        const { name, description, price, imageurl } = req.body;
        
// sql files can be executed by chaining on the .file_name
// name, description, price and imageurl from the request body.
        dbInstance.create_product([name, description, price, imageurl])
// .then is chained to use res to send statuses
            .then( () => res.status(200).send() )
            .catch( () => res.status(500).send() );
    },
  
    getOne: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
      const { params } = req;
  
      dbInstance.read_product()
        .then( product => res.status(200).send( product ) )
        .catch( () => res.status(500).send() );
    },
  
    getAll: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
  
      dbInstance.read_products()
        .then( products => res.status(200).send( products ) )
        .catch( () => res.status(500).send() );
    },
  
    update: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
      const { params, query } = req;
  
  // id from the request parameters and the desc from the request query.      
      dbInstance.update_product([ params.id, query.desc ])
        .then( () => res.status(200).send() )
        .catch( () => res.status(500).send() );
    },
  
    delete: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
      const { params } = req;
  
      dbInstance.delete_product([ params.id ])
        .then( () => res.status(200).send() )
        .catch( () => res.status(500).send() );
    }
  };