import { renderHook, act } from '@testing-library/react-hooks'
import { HomepageProvider, useHomepageContext } from '../HomepageContext'
import { mockParsedVideos } from '../__mocks__/videos';

let mockFetchVideos = jest.fn()

jest.mock("../../features/videos/hooks/useLoadVideos", () => ({
  __esModule: true,
  default: () => ({
    data: mockParsedVideos,
    total: 2,
    fetchVideos: mockFetchVideos
  }),
}));

describe('HomepageProvider', () => {
  it('should provide the homepage context', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HomepageProvider>{children}</HomepageProvider>
    )

    const { result } = renderHook(() => useHomepageContext(), { wrapper })

    expect(result.current.page).toBe(1)
    expect(result.current.videos).toEqual(mockParsedVideos)

    await act(async () => {
      result.current.setPage(2)
    })

    expect(result.current.page).toBe(2)

    await act(async () => {
      result.current.refresh()
    })

    expect(result.current.page).toBe(1)
  })
})
