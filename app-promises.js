const users = [{
  id:1,
  name:"Mush",
  schoolId:101
},{
  id:2,
  name:"Jen",
  schoolId:999
}]

const grades=[{
  id:1,
  schoolId:101,
  grade:86
},{
  id:2,
  schoolId:999,
  grade:100
},{
  id:3,
  schoolId:101,
  grade:80
}]

const getUser=(id) => {
  return new Promise((resolve,reject) => {
    var user=users.find((user) => user.id===id);
    if(user){
      resolve(user)
    }else{
      reject(`Unable to find user with id of ${id} `)
    }
  })
}
const getGrades=(schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => grade.schoolId===schoolId))
  })
}
const getStatus=(id) => {
  let user;
  return getUser(id).then((tuser) => {
    user=tuser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    //don't have access to user which we found just above. Problem with promises
    let avg=0;
    if(grades.length>0){
      avg=grades.map((grade) => grade.grade).reduce((a,b) => {
        return a+b;
      })/grades.length;
    }
    return `${user.name} has ${avg}% in class`
    console.log(avg);
  })
}

// () => {
//   return new Promise((res,rej) => {
//     res('Mike')l
//   })
// }
const getStatusAlt= async (userId) => {
  const user=await getUser(userId);
  console.log(user);
  const grades= await getGrades(user.schoolId);
  console.log(grades);
  let avg=0;
  if(grades.length>0){
    avg=grades.map((grade) => grade.grade).reduce((a,b) => {
      return a+b;
    })/grades.length;
  }
  return `${user.name} has ${avg}% in class`
  // await
  //return 'Mike';//returning a promise that resolves 'Mike'
  //throw new Error('This is an error') //euivalent to rejecting
}

//no top level await. Need to use await inside async function
getStatusAlt(2).then((s) => {
  console.log(s);
}).catch((e) => {
  console.log(e);
});
// getStatus(2).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// })
// getGrades(999).then((user) => {
//   console.log(user);
// })
// getUser(21).then((user) => {
//   console.log(user);
// }).catch((e) =>{
//   console.log(e);
// })
