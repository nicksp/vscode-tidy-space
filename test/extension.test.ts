import type { ExtensionContext } from 'vscode'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { commands, workspace } from 'vscode'

import { activate } from '../src/extension'

vi.mock('vscode', () => ({
  commands: {
    registerCommand: vi.fn(),
    executeCommand: vi.fn(),
  },
  workspace: {
    getConfiguration: vi.fn(() => ({
      get: vi.fn((key: string, defaultValue: any) => defaultValue),
    })),
  },
  window: {
    createOutputChannel: vi.fn(() => ({
      appendLine: vi.fn(),
      clear: vi.fn(),
      show: vi.fn(),
      hide: vi.fn(),
    })),
  },
}))

describe('extension', () => {
  let mockContext: ExtensionContext

  beforeEach(() => {
    vi.clearAllMocks()
    mockContext = {
      subscriptions: [],
    } as any
  })

  describe('activate', () => {
    it('registers commands', () => {
      activate(mockContext)

      expect(commands.registerCommand).toHaveBeenCalledWith('tidySpace.toggleSidebarVisibility', expect.any(Function))
      expect(commands.registerCommand).toHaveBeenCalledWith('tidySpace.toggleAuxiliaryBar', expect.any(Function))
    })

    it('adds command subscriptions to context', () => {
      activate(mockContext)

      expect(mockContext.subscriptions).toHaveLength(2)
    })

    it('gets configuration on activation', () => {
      activate(mockContext)

      expect(workspace.getConfiguration).toHaveBeenCalledWith('tidy-space')
    })
  })
})
