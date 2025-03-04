-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_category_id_fkey`;

-- AlterTable
ALTER TABLE `products` MODIFY `thumbnailUrl` VARCHAR(255) NULL,
    MODIFY `price` INTEGER NULL DEFAULT 0,
    MODIFY `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
