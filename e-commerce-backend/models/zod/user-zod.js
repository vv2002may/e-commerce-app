const zod = require('zod');

const usersZod = zod.object({
   name: zod.string().min(1),
   email: zod.string().email(),
   password: zod.string().min(3)
});

module.exports=usersZod