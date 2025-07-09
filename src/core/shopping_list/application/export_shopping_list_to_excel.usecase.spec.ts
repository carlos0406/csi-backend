import { ExportShoppingListToExcelUsecase } from './export_shopping_list_to_excel.usecase';
import { IShoppingListRepository } from '../domain/shopping_list.repository.interface';

describe('ExportShoppingListToExcelUsecase', () => {
  let usecase: ExportShoppingListToExcelUsecase;
  let mockRepository: jest.Mocked<IShoppingListRepository>;

  beforeEach(() => {
    mockRepository = {
      listWithCount: jest.fn(),
      create: jest.fn(),
      findByUserId: jest.fn(),
      findById: jest.fn(),
      searchByPurchaseId: jest.fn(),
    };

    usecase = new ExportShoppingListToExcelUsecase(mockRepository);
  });

  describe('execute', () => {
    it('should export shopping list to Excel buffer', async () => {
      // Arrange
      const purchaseId = 'test-purchase-id';
      const mockShoppingList = {
        purchase: {
          id: purchaseId,
          items: [
            {
              card: { id: 1, name: 'Blue Eyes White Dragon' },
              rarity: { id: 'rare', name: 'Rare' },
              collection: 'LOB',
              totalQuantity: 3,
            },
            {
              card: { id: 2, name: 'Dark Magician' },
              rarity: { id: 'ultra', name: 'Ultra Rare' },
              collection: 'LOB',
              totalQuantity: 1,
            },
          ],
        },
      };

      mockRepository.listWithCount.mockResolvedValue(mockShoppingList);

      // Act
      const result = await usecase.execute(purchaseId);

      // Assert
      expect(mockRepository.listWithCount).toHaveBeenCalledWith(purchaseId);
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should throw error when shopping list not found', async () => {
      // Arrange
      const purchaseId = 'non-existent-purchase';
      mockRepository.listWithCount.mockResolvedValue(null);

      // Act & Assert
      await expect(usecase.execute(purchaseId)).rejects.toThrow(
        'Failed to export shopping list to Excel: Shopping list not found',
      );
    });

    it('should throw error when repository fails', async () => {
      // Arrange
      const purchaseId = 'test-purchase-id';
      const repositoryError = new Error('Database connection failed');
      mockRepository.listWithCount.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(usecase.execute(purchaseId)).rejects.toThrow(
        'Failed to export shopping list to Excel: Database connection failed',
      );
    });
  });
});
