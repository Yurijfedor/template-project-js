// const page = []
//             const nu = 8
//             let numberPage = Number(nu) + Number(pageNum)
//             console.log(Number(nu) + Number(pageNum));
//             if (pageNum < 4) {
//                 for (let index = 1; index < Number(numberPage - 3) && index < totalPages; index++) {
//                     const element = index;
//                     page.push(<li class="lig" id="${element}">${element}</li>)
//                 }
//                 page.push(<li class="lig" id="">...</li><li class="lig" id="${totalPages}">${totalPages}</li><li class="back"> > </li>)
//             } else {
//                 page.push(<li class="back"><</li><li class="lig" id="">1</li><li class="lig" id="">...</li>)
//                 for (let index = Number(pageNum - 2); index < Number(numberPage - 5) && index < totalPages; index++) {
//                     console.log(index, numberPage);
//                     const element = index;
//                     page.push(<li class="lig" id="${element}">${index}</li>)
//                 }
//                 page.push(<li class="lig" id="">...</li><li class="lig" id="${totalPages}">${totalPages}</li><span class="next"> > </span>)
//                 console.log(totalPages);
//             }

//             number.innerHTML = page.join("")
