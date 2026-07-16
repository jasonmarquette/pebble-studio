/** Host-side paths for the emulator stack.
 *
 * Native Linux/macOS pebble-tool writes its state file to Python's
 * tempfile.gettempdir(), which matches Node's tmpdir(). WSL is different: the
 * commands execute inside the Linux distro, so its state file remains under
 * /tmp regardless of the Windows host's temp directory.
 *
 * All POSIX paths are embedded UNQUOTED in shell command lines, so they must
 * stay quote-free and space-free. tests/backend/hostPaths.test.ts enforces that
 * shape. */
import { tmpdir } from "node:os";

export const EMU_INFO_PATH = `${tmpdir()}/pb-emulator.json`;
export const EMU_LOG_PATH = `${tmpdir()}/pebble-emu.log`;
export const WSL_EMU_INFO_PATH = "/tmp/pb-emulator.json";
export const SDK_ROOT = "$HOME/.local/share/pebble-sdk/SDKs/current";

export interface WinHostPaths {
  /** %TEMP%\pb-emulator.json — pebble-tool writes the state file to tempfile.gettempdir(). */
  emuInfo: string;
  /** %TEMP%\pebble-emu.log */
  emuLog: string;
  /** %LOCALAPPDATA%\pebble-sdk\SDKs\current */
  sdkRoot: string;
}

/**
 * Windows-native host paths (real Win32 paths read via Node `fs`, NEVER embedded
 * in a shell command line — so unlike the POSIX consts above they may contain
 * spaces/backslashes). `env` is injectable for tests; defaults to process.env.
 */
export function winHostPaths(env: Record<string, string | undefined> = process.env): WinHostPaths {
  const temp = env.TEMP || env.TMP || "C:\\Windows\\Temp";
  const local = env.LOCALAPPDATA || "C:\\Users\\Default\\AppData\\Local";
  return {
    emuInfo: `${temp}\\pb-emulator.json`,
    emuLog: `${temp}\\pebble-emu.log`,
    sdkRoot: `${local}\\pebble-sdk\\SDKs\\current`,
  };
}
