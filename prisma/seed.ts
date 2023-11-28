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
      { username: 'admin', password: pass, address: 'Semarang', phoneNumber: '08123456890', roleId: 1 },
      { username: 'user1', password: pass, address: 'Semarang', phoneNumber: '08123456890', roleId: 2 },
      { username: 'user2', password: pass, address: 'Semarang', phoneNumber: '08123456890', roleId: 2 },
      { username: 'user3', password: pass, address: 'Semarang', phoneNumber: '08123456890', roleId: 2 },
    ],
  });

  console.log("Dummy users created");

  await prisma.carModel.createMany({
    data: [
      { name: 'Toyota Avanza', costPerDay: 500000, imageUrl: 'https://www.toyota.astra.co.id//sites/default/files/2023-09/2-avanza-gray-metallic.png' },
      { name: 'Honda Brio', costPerDay: 500000, imageUrl: 'https://asset.honda-indonesia.com/variants/images/VmfueMMOko09BwpogWPFmBUShLbLDzik4wPP6AFz.png' },
      { name: 'Nissan X-Trail', costPerDay: 700000, imageUrl: 'https://storage.googleapis.com/prod-nissan-indonesia/static-assets/XTRAIL-16-9.jpg' },
      { name: 'Mazda CX-5', costPerDay: 750000, imageUrl: 'https://mazda.co.id/media/43xdogng/elite-banner.jpg' },
      { name: 'Chevrolet Traverse', costPerDay: 800000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLTuZ7hcRhAC4YBnxqyye9SIOUxGS8JpdTh21ntwqM&s' },
      { name: 'Ford Mustang', costPerDay: 1000000, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZrNxb588l1osakL88C1hZXMB8M7DyNxUGxLTo84IS&s' },
      { name: 'Mercedes-Benz C-Class', costPerDay: 1200000, imageUrl: 'https://momobil.id/news/wp-content/uploads/2022/09/Mercedes-benz-c63-s-1024x576.jpg' },
      { name: 'BMW E46', costPerDay: 1500000, imageUrl: 'https://www.carmag.co.za/wp-content/uploads/2023/09/CC-2-1-800x480.webp' },
      { name: 'Audi Q7', costPerDay: 1400000, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2024-audi-q7-102-6495edad98657.jpg?crop=0.583xw:0.436xh;0.333xw,0.439xh&resize=1200:*' },
      { name: 'Tesla Model S', costPerDay: 2000000, imageUrl: 'https://img5.icarcdn.com/97099/prev-desktop_tesla-model-x-suv-listrik-yang-memikat_cover_2015_tesla-model-x.jpg' }
    ],
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
