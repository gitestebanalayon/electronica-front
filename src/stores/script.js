// import { defineStore } from 'pinia';
// import Swal from 'sweetalert2';

// export const useClientesStore = defineStore('clientes', {
//     state: () => ({
//         clientes: [], //------- Lista de clientes
//         total: 0, //------------ Total de clientes
//         cliente: null,
//         inputs: false,
//         loading: false
//     }),
//     actions: {
//         async listarClientes() {
//             try {
//                 await fetch('http://localhost/web-application-pro/php/controller/cliente/read.php')
//                     .then(response => response.json())
//                     .then(data => {
//                         this.clientes = data; //---------------- Lista de clientes
//                         this.total = data.length; //------------ Total de clientes
//                     })
//             } catch (error) {
//                 console.log(error);
//             }
//         },
//         async borrarCliente(id_c) {
//             try {
//                 Swal.fire({
//                     title: "¡Espera!",
//                     text: "¿Seguro que deseas borrar el registro?",
//                     icon: "warning",
//                     showCancelButton: true,
//                     confirmButtonColor: "#3085d6",
//                     cancelButtonColor: "#d33",
//                     confirmButtonText: "Si"
//                 }).then(async (result) => {
//                     if (result.isConfirmed) {
//                         const data = new FormData();
//                         data.append('id_c', id_c);
//                         await fetch('http://localhost/web-application-pro/php/controller/cliente/delete.php', {
//                             method: 'POST',
//                             body: data
//                         }).then(async (response) => {
//                             if (response.ok) {
//                                 await this.listarClientes();
//                                 const Toast = Swal.mixin({
//                                     toast: true,
//                                     position: 'top',
//                                     showConfirmButton: false,
//                                     timer: 3000,
//                                     timerProgressBar: true,
//                                     didOpen: (toast) => {
//                                         toast.addEventListener('mouseenter', Swal.stopTimer)
//                                         toast.addEventListener('mouseleave', Swal.resumeTimer)
//                                     }
//                                 });
//                                 Toast.fire({
//                                     icon: 'success',
//                                     title: '¡Borrado exitosamente!'
//                                 });
//                             }
//                         });
//                     }
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//         },
//         async editarCliente(id_c) {
//             this.loading = true;
//             try {
//                 const response = await fetch('http://localhost/web-application-pro/php/controller/cliente/read.php');
//                 const data = await response.json();
//                 const datos = data.find(cliente => cliente.id_c === id_c);
//                 this.inputs = true;
//                 this.cliente = datos
//                 return datos;
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 this.loading = false;
//             }
//         },
//         async actualizarCliente() {
//             try {
//                 const formData = new FormData();
//                 const jsonCliente = { 'id_c': this.cliente.id_c, 'nom_c': this.cliente.nom_c, 'ape_c': this.cliente.ape_c, 'ced_c': this.cliente.ced_c, 'tel_c': this.cliente.tel_c }
//                 for (const [key, value] of Object.entries(jsonCliente)) {
//                     formData.append(key, value);
//                 }

//                 await fetch('http://localhost/web-application-pro/php/controller/cliente/update.php', {
//                     method: 'POST',
//                     body: formData
//                 }).then(async (response) => {
//                     if (response.ok) {
//                         await this.listarClientes();

//                         const Toast = Swal.mixin({
//                             toast: true,
//                             position: 'top',
//                             showConfirmButton: false,
//                             timer: 3000,
//                             timerProgressBar: true,
//                             didOpen: (toast) => {
//                                 toast.addEventListener('mouseenter', Swal.stopTimer)
//                                 toast.addEventListener('mouseleave', Swal.resumeTimer)
//                             }
//                         });
//                         Toast.fire({
//                             icon: 'success',
//                             title: 'Modificación procesada'
//                         })
//                     } else {
//                         console.log('error');
//                     }
//                 })
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     },
// });

// export const useAparatosStore = defineStore('aparatos', {
//     state: () => ({
//         aparatos: [], //------- Lista de aparatos
//         total: 0, //----------- Total de aparatos
//         reparados: 0, //------- Cantidad de aparatos reparados
//         noReparados: 0, // ---- Cantidad de aparatos no reparados
//     }),
//     actions: {
//         async listarAparatos() {
//             try {
//                 await fetch('http://localhost/web-application-pro/php/controller/aparato/read.php')
//                     .then(response => response.json())
//                     .then(data => {
//                         this.aparatos = data; //------------------------- Lista de aparatos
//                         this.total = data.length; //--------------------- Total de aparatos

//                         let arrayReparados = []
//                         data.map(function (obj) {
//                             if (obj.rep_a == 1 && obj.fec_ret_a == '0000-00-00' && obj.del_a == 0) {
//                                 arrayReparados.push(obj.rep_a)
//                             }
//                         })
//                         this.reparados = arrayReparados.length //-------- Cantidad de aparatos reparados

//                         let arrayNoReparados = []
//                         data.map(function (obj) {
//                             if (obj.rep_a == 0 && obj.del_a == 0) {
//                                 arrayNoReparados.push(obj.rep_a)
//                             }
//                         })
//                         this.noReparados = arrayNoReparados.length //---- Cantidad de aparatos no reparados

//                     })
//             } catch (error) {
//                 console.log(error);
//             }
//         },
//     },
// });

// export const useEmpleadosStore = defineStore('empleados', {
//     state: () => ({
//         empleados: [],
//         total: 0
//     }),
//     actions: {
//         async listarEmpleados() {
//             try {
//                 await fetch('http://localhost/web-application-pro/php/controller/empleado/read.php')
//                     .then(response => response.json())
//                     .then(data => {
//                         this.empleados = data;
//                         this.total = data.length;
//                     })
//             } catch (error) {
//                 console.log(error);
//             }
//         },
//     },
// });