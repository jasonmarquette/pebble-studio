/** Host-side paths for the emulator stack.
 *
 * Native POSIX hosts use Node's tmpdir(), matching Python tempfile.gettempdir().
 * When the Electron host is Windows but the emulator runs inside WSL, shell
 * commands must use WSL's own /tmp rather than the Windows host temp directory.
 *
 * All POSIX paths are embedded UNQUOTED in shell command lines (which may cross
 * the wsl.exe -- bash -lc boundary), so they must stay quote-free and space-free;
 * $HOME is expanded in-distro by bash. tests/backend/hostPaths.test.ts enforces
 * that shape. */
import { tmpdir } from "node:os";

const POSIX_TMP_DIR =