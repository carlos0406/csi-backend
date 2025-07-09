import { ExportDetailedShoppingListToExcelUsecase } from './export_detailed_shopping_list_to_excel.usecase';
import { IShoppingListRepository } from '../domain/shopping_list.repository.interface';

describe('ExportDetailedShoppingListToExcelUsecase', () => {
  let usecase: ExportDetailedShoppingListToExcelUsecase;
  let mockRepository: jest.Mocked<IShoppingListRepository>;

  beforeEach(() => {
    mockRepository = {
      searchByPurchaseId: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      findByUserId: jest.fn(),
      listWithCount: jest.fn(),
    };

    usecase = new ExportDetailedShoppingListToExcelUsecase(mockRepository);
  });

  describe('execute', () => {
    it('should export detailed shopping lists to Excel with multiple sheets', async () => {
      // Arrange
      const purchaseId = 'test-purchase-id';
      const mockShoppingLists = [
        {
          id: 'shopping-list-1',
          user: { id: 'user-1', name: 'John Doe', image: null },
          purchase: { id: purchaseId, name: 'Test Purchase' },
        } as any,
      ];

      const mockDetailedShoppingList = {
        id: 'shopping-list-1',
        items: [
          {
            id: 'item-1',
            card: { id: 1, name: 'Blue Eyes White Dragon' },
            rarity: { id: 'rare', name: 'Rare' },
            collection: 'LOB',
            quantity: 3,
            unit_price: 50.0,
          },
        ],
      } as any;

      mockRepository.searchByPurchaseId.mockResolvedValue(mockShoppingLists);
      mockRepository.findById.mockResolvedValue(mockDetailedShoppingList);

      // Act
      const result = await usecase.execute(purchaseId);

      // Assert
      expect(mockRepository.searchByPurchaseId).toHaveBeenCalledWith(
        purchaseId,
      );
      expect(mockRepository.findById).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should throw error when no shopping lists found', async () => {
      // Arrange
      const purchaseId = 'non-existent-purchase';
      mockRepository.searchByPurchaseId.mockResolvedValue([]);

      // Act & Assert
      await expect(usecase.execute(purchaseId)).rejects.toThrow(
        'Failed to export detailed shopping lists to Excel: No shopping lists found for this purchase',
      );
    });

    it('should create empty sheet when no items found', async () => {
      // Arrange
      const purchaseId = 'test-purchase-id';
      const mockShoppingLists = [
        {
          id: 'shopping-list-1',
          user: { id: 'user-1', name: 'John Doe', image: null },
          purchase: { id: purchaseId, name: 'Test Purchase' },
        } as any,
      ];

      mockRepository.searchByPurchaseId.mockResolvedValue(mockShoppingLists);
      mockRepository.findById.mockResolvedValue(null);

      // Act
      const result = await usecase.execute(purchaseId);

      // Assert
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should throw error when repository fails', async () => {
      // Arrange
      const purchaseId = 'test-purchase-id';
      const repositoryError = new Error('Database connection failed');
      mockRepository.searchByPurchaseId.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(usecase.execute(purchaseId)).rejects.toThrow(
        'Failed to export detailed shopping lists to Excel: Database connection failed',
      );
    });
  });
});
