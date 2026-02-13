import { useEffect } from 'react';

/**
 * Hook to prevent swipe-back gesture on mobile browsers
 * while allowing horizontal scroll in specific elements ONLY when not at edges
 */
export function usePreventSwipeBack() {
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let scrollableElement: HTMLElement | null = null;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isScrolling = false;
      
      // Проверяем, начинается ли touch на элементе с горизонтальной прокруткой
      const target = e.target as HTMLElement;
      const element = target.closest(
        '.mobile-scrollbar, [style*="overflow-x"], .overflow-x-auto, .overflow-x-scroll, [data-allow-horizontal-scroll]'
      ) as HTMLElement;
      
      scrollableElement = element;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      
      const deltaX = touchCurrentX - touchStartX;
      const deltaY = touchCurrentY - touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      
      // Определяем направление движения при первом значительном движении
      if (!isScrolling && (absDeltaX > 5 || absDeltaY > 5)) {
        isScrolling = true;
      }
      
      // Если горизонтальное движение больше вертикального
      if (absDeltaX > absDeltaY && absDeltaX > 5) {
        let shouldPrevent = true;
        
        // Если есть прокручиваемый элемент, проверяем его границы
        if (scrollableElement) {
          const canScrollHorizontally = scrollableElement.scrollWidth > scrollableElement.clientWidth;
          
          if (canScrollHorizontally) {
            const scrollLeft = scrollableElement.scrollLeft;
            const maxScrollLeft = scrollableElement.scrollWidth - scrollableElement.clientWidth;
            
            // Свайп вправо (deltaX > 0) - разрешаем только если не в начале
            const isSwipingRight = deltaX > 0;
            const isAtLeftEdge = scrollLeft <= 1;
            
            // Свайп влево (deltaX < 0) - разрешаем только если не в конце
            const isSwipingLeft = deltaX < 0;
            const isAtRightEdge = scrollLeft >= maxScrollLeft - 1;
            
            // Разрешаем прокрутку только если мы НЕ на краю в направлении свайпа
            if ((isSwipingRight && !isAtLeftEdge) || (isSwipingLeft && !isAtRightEdge)) {
              shouldPrevent = false;
            }
          }
        }
        
        // Блокируем событие если нужно
        if (shouldPrevent) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartX = 0;
      touchStartY = 0;
      scrollableElement = null;
      isScrolling = false;
    };

    const handleTouchCancel = () => {
      touchStartX = 0;
      touchStartY = 0;
      scrollableElement = null;
      isScrolling = false;
    };

    // Добавляем обработчики с { passive: false } чтобы preventDefault работал
    const options = { passive: false, capture: true };
    document.addEventListener('touchstart', handleTouchStart, options);
    document.addEventListener('touchmove', handleTouchMove, options);
    document.addEventListener('touchend', handleTouchEnd, options);
    document.addEventListener('touchcancel', handleTouchCancel, options);

    // Очистка при размонтировании
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, []);
}