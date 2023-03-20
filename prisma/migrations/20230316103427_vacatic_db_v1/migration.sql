/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isHost` on the `Member` table. All the data in the column will be lost.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `RoomDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `memberMember_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomRoom_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberIsHost` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostHost_id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomLocation` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomPricePerNight` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomTitle` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
ADD COLUMN     "memberMember_id" TEXT NOT NULL,
ADD COLUMN     "roomRoom_id" TEXT NOT NULL,
ALTER COLUMN "booking_id" DROP DEFAULT,
ALTER COLUMN "booking_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("booking_id");
DROP SEQUENCE "Booking_booking_id_seq";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "isHost",
ADD COLUMN     "memberIsHost" BOOLEAN NOT NULL,
ALTER COLUMN "member_id" DROP DEFAULT,
ALTER COLUMN "member_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("member_id");
DROP SEQUENCE "Member_member_id_seq";

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
ADD COLUMN     "hostHost_id" TEXT NOT NULL,
ADD COLUMN     "roomDescription" TEXT,
ADD COLUMN     "roomImage" TEXT,
ADD COLUMN     "roomLocation" TEXT NOT NULL,
ADD COLUMN     "roomPricePerNight" MONEY NOT NULL,
ADD COLUMN     "roomTitle" TEXT NOT NULL,
ADD COLUMN     "roomType" TEXT[] DEFAULT ARRAY['beachfront', 'pvtroom', 'smhouse', 'mdhouse', 'mansion', 'hotelroom']::TEXT[],
ALTER COLUMN "room_id" DROP DEFAULT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id");
DROP SEQUENCE "Room_room_id_seq";

-- DropTable
DROP TABLE "RoomDetail";

-- CreateTable
CREATE TABLE "Host" (
    "host_id" TEXT NOT NULL,
    "bankAccountNumber" TEXT,
    "hostMember_id" TEXT NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("host_id")
);

-- CreateTable
CREATE TABLE "History" (
    "history_id" TEXT NOT NULL,
    "memberMember_id" TEXT NOT NULL,
    "bookingBooking_id" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "Status" (
    "status_id" TEXT NOT NULL,
    "statusVacancy" BOOLEAN NOT NULL,
    "roomRoom_id" TEXT NOT NULL,
    "bookingBooking_id" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("status_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Host_hostMember_id_key" ON "Host"("hostMember_id");

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_hostMember_id_fkey" FOREIGN KEY ("hostMember_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_memberMember_id_fkey" FOREIGN KEY ("memberMember_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomRoom_id_fkey" FOREIGN KEY ("roomRoom_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_memberMember_id_fkey" FOREIGN KEY ("memberMember_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_bookingBooking_id_fkey" FOREIGN KEY ("bookingBooking_id") REFERENCES "Booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostHost_id_fkey" FOREIGN KEY ("hostHost_id") REFERENCES "Host"("host_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_roomRoom_id_fkey" FOREIGN KEY ("roomRoom_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_bookingBooking_id_fkey" FOREIGN KEY ("bookingBooking_id") REFERENCES "Booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;
