import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' },
    ],
  });

  console.log("Roles created");

  const pass = await bcrypt.hash('password', 10);

  await prisma.user.createMany({
    data: [
      { username: 'admin', password: pass, fullName: 'Admin', address: 'Semarang', phoneNumber: '08123456890', roleId: 1 },
      { username: 'user', password: pass, fullName: 'A.Miftachul Hidayat', address: 'Semarang', phoneNumber: '08123456890', roleId: 2 },
      { username: 'user2', password: pass, fullName: 'Alice', address: 'Semarang', phoneNumber: '08123456890', roleId: 2 },
      { username: 'user3', password: pass, fullName: 'Bob', address: 'Semarang', phoneNumber: '08123456890', roleId: 2 },
    ],
  });

  console.log("Dummy users created");

  await prisma.carModel.createMany({
    data: [
      { name: 'Toyota Avanza', costPerDay: 500000, imageUrl: 'https://www.toyota.astra.co.id//sites/default/files/2023-09/2-avanza-gray-metallic.png' },
      { name: 'Honda Brio', costPerDay: 500000, imageUrl: 'https://asset.honda-indonesia.com/variants/images/VmfueMMOko09BwpogWPFmBUShLbLDzik4wPP6AFz.png' },
      { name: 'Nissan X-Trail', costPerDay: 700000, imageUrl: 'https://storage.googleapis.com/prod-nissan-indonesia/static-assets/XTRAIL-16-9.jpg' },
      { name: 'Mazda CX-5', costPerDay: 750000, imageUrl: 'https://imgcdn.oto.com/large/gallery/exterior/23/1595/mazda-cx-5-front-angle-low-view-920341.jpg' },
      { name: 'Chevrolet Traverse', costPerDay: 800000, imageUrl: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/suvs/traverse/01-images/masthead/v3/2023-traverse-masthead-01.jpg?imwidth=1200' },
      { name: 'Ford Mustang', costPerDay: 1000000, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2022-ford-mustang-shelby-gt500-02-1636734552.jpg?crop=1.00xw:0.891xh;0,0.0759xh&resize=1200:*' },
      { name: 'Mercedes-Benz C-Class', costPerDay: 1200000, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2024-mercedes-amg-c63-s-e-performance-front-motion5-1663695513.jpg?crop=0.761xw:0.641xh;0.0896xw,0.246xh&resize=1200:*' },
      { name: 'BMW E46', costPerDay: 1500000, imageUrl: 'https://www.topgear.com/sites/default/files/cars-car/carousel/2020/12/p90236604_highres_the-bmw-m3-csl-e46-0.jpg?w=892&h=502' },
      { name: 'Audi Q7', costPerDay: 1400000, imageUrl: 'https://www.audi.co.id/content/dam/nemo/models/q7/q7/my-2022/NeMo-Derivate-Startpage/stage/1920x1080-Q7_2020_1986.jpg?imwidth=1440' },
      { name: 'Tesla Model S', costPerDay: 2000000, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png' }
    ]
  });

  console.log("Car model added");

  await prisma.car.createMany({
    data: [
      { carModelId: 1, registrationNumber: 'H 1111 JH' },
      { carModelId: 1, registrationNumber: 'B 6342 KL' },
      { carModelId: 2, registrationNumber: 'D 9876 AB' },
      { carModelId: 3, registrationNumber: 'T 5432 CD' },
      { carModelId: 4, registrationNumber: 'L 8765 EF' },
      { carModelId: 5, registrationNumber: 'W 2345 GH' },
      { carModelId: 6, registrationNumber: 'A 7890 IJ' },
      { carModelId: 7, registrationNumber: 'M 8765 KL' },
      { carModelId: 8, registrationNumber: 'P 4321 MN' },
      { carModelId: 9, registrationNumber: 'K 5678 OP' },
      { carModelId: 10, registrationNumber: 'R 1234 QR' },
      { carModelId: 2, registrationNumber: 'S 5678 ST' },
      { carModelId: 3, registrationNumber: 'U 8765 VW' },
      { carModelId: 4, registrationNumber: 'X 4321 XY' },
      { carModelId: 5, registrationNumber: 'C 5678 YZ' },
      { carModelId: 6, registrationNumber: 'N 1234 AB' },
      { carModelId: 7, registrationNumber: 'E 5678 CD' },
      { carModelId: 8, registrationNumber: 'J 8765 EF' },
      { carModelId: 9, registrationNumber: 'Z 4321 GH' },
      { carModelId: 10, registrationNumber: 'O 5678 IJ' },
    ],
  });

  console.log("Cars added");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
